import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import type { VisitorDataPoint } from "@skeleton/shared";

import * as repo from "./repository.js";

vi.mock("./repository.js");

const mockedRepo = vi.mocked(repo);

describe("dashboard service", () => {
  let service: typeof import("./service.js");

  beforeAll(async () => {
    service = await import("./service.js");
  });

  afterEach(() => vi.resetAllMocks());

  it("getVisitors delegates to repository", () => {
    const visitors: VisitorDataPoint[] = [
      { date: "2025-01-01", desktop: 10, mobile: 5 },
    ];
    mockedRepo.getVisitors.mockReturnValue(visitors);

    const result = service.getVisitors();
    expect(result).toEqual(visitors);
    expect(mockedRepo.getVisitors).toHaveBeenCalledTimes(1);
  });

  it("getDocuments passes userId to repository", async () => {
    mockedRepo.getDocuments.mockResolvedValue([]);

    await service.getDocuments("user-123");
    expect(mockedRepo.getDocuments).toHaveBeenCalledWith("user-123");
  });

  it("deleteDocument passes userId and id to repository", async () => {
    mockedRepo.deleteDocument.mockResolvedValue(undefined as any);

    await service.deleteDocument("user-123", 42);
    expect(mockedRepo.deleteDocument).toHaveBeenCalledWith("user-123", 42);
  });
});
