import { describe, expect, it } from "vitest";
import {
  DocumentSchema,
  CreateDocumentSchema,
  SummaryCardSchema,
  VisitorDataPointSchema,
} from "./dashboard.js";

describe("DocumentSchema", () => {
  it("validates a correct document", () => {
    const doc = {
      id: 1,
      header: "Report",
      type: "PDF",
      status: "active",
      target: "team",
      limit: "100",
      reviewer: "alice",
    };
    expect(DocumentSchema.parse(doc)).toEqual(doc);
  });

  it("rejects a document missing required fields", () => {
    expect(() => DocumentSchema.parse({ id: 1 })).toThrow();
  });
});

describe("CreateDocumentSchema", () => {
  it("accepts a document without id", () => {
    const doc = {
      header: "Report",
      type: "PDF",
      status: "active",
      target: "team",
      limit: "100",
      reviewer: "alice",
    };
    expect(CreateDocumentSchema.parse(doc)).toEqual(doc);
  });
});

describe("SummaryCardSchema", () => {
  it("validates trend enum values", () => {
    const card = {
      title: "Revenue",
      value: "$1000",
      badge: "+5%",
      trend: "up" as const,
      footerText: "vs last month",
      footerSub: "Jan 2025",
    };
    expect(SummaryCardSchema.parse(card)).toEqual(card);
  });

  it("rejects invalid trend value", () => {
    expect(() =>
      SummaryCardSchema.parse({
        title: "Revenue",
        value: "$1000",
        badge: "+5%",
        trend: "sideways",
        footerText: "vs last month",
        footerSub: "Jan 2025",
      }),
    ).toThrow();
  });
});

describe("VisitorDataPointSchema", () => {
  it("validates a visitor data point", () => {
    const point = { date: "2025-01-01", desktop: 100, mobile: 50 };
    expect(VisitorDataPointSchema.parse(point)).toEqual(point);
  });
});
