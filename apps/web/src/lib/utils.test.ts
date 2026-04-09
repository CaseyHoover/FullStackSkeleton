import { describe, expect, it } from "vitest";

import { cn } from "./utils.js";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("text-sm", "font-bold")).toBe("text-sm font-bold");
  });

  it("filters out falsy values", () => {
    expect(cn("block", undefined, "text-sm")).toBe("block text-sm");
  });

  it("deduplicates conflicting tailwind classes", () => {
    expect(cn("px-4", "px-2")).toBe("px-2");
  });
});
