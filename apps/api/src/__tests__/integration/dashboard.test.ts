import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { Document, SummaryCard, VisitorDataPoint } from "@skeleton/shared";
import { appRequest, cleanupTestData, createTestUser } from "./helpers.js";

let cookie: string;
let userId: string;

beforeAll(async () => {
  const testUser = await createTestUser();
  cookie = testUser.cookie;
  userId = testUser.user.id;
});

afterAll(async () => {
  await cleanupTestData(userId);
});

describe("GET /dashboard/visitors", () => {
  it("returns 401 without auth", async () => {
    const res = await appRequest("/dashboard/visitors");
    expect(res.status).toBe(401);
  });

  it("returns visitor data with auth", async () => {
    const res = await appRequest("/dashboard/visitors", { cookie });
    expect(res.status).toBe(200);

    const data = (await res.json()) as VisitorDataPoint[];
    expect(Array.isArray(data)).toBe(true);
    expect(data[0]).toHaveProperty("date");
    expect(data[0]).toHaveProperty("desktop");
    expect(data[0]).toHaveProperty("mobile");
  });
});

describe("GET /dashboard/summary", () => {
  it("returns 401 without auth", async () => {
    const res = await appRequest("/dashboard/summary");
    expect(res.status).toBe(401);
  });

  it("returns summary cards with auth", async () => {
    const res = await appRequest("/dashboard/summary", { cookie });
    expect(res.status).toBe(200);

    const data = (await res.json()) as SummaryCard[];
    expect(Array.isArray(data)).toBe(true);
    expect(data[0]).toHaveProperty("title");
    expect(data[0]).toHaveProperty("value");
  });
});

describe("POST /dashboard/documents", () => {
  it("returns 401 without auth", async () => {
    const res = await appRequest("/dashboard/documents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        header: "Test Doc",
        type: "Report",
        status: "Draft",
        target: "Q1",
        limit: "100",
        reviewer: "alice",
      }),
    });
    expect(res.status).toBe(401);
  });

  it("creates a document", async () => {
    const payload = {
      header: "Integration Test Doc",
      type: "Report",
      status: "Draft",
      target: "Q1 2026",
      limit: "500",
      reviewer: "bob",
    };

    const res = await appRequest("/dashboard/documents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cookie,
      body: JSON.stringify(payload),
    });

    expect(res.status).toBe(201);
    const doc = (await res.json()) as Document;
    expect(doc).toMatchObject(payload);
    expect(doc).toHaveProperty("id");
  });
});

describe("GET /dashboard/documents", () => {
  it("returns documents for the authenticated user", async () => {
    // Seed a document so this test doesn't depend on run order
    await appRequest("/dashboard/documents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cookie,
      body: JSON.stringify({
        header: "Seeded",
        type: "Report",
        status: "Active",
        target: "Q1",
        limit: "10",
        reviewer: "eve",
      }),
    });

    const res = await appRequest("/dashboard/documents", { cookie });
    expect(res.status).toBe(200);

    const docs = (await res.json()) as Document[];
    expect(Array.isArray(docs)).toBe(true);
    expect(docs.length).toBeGreaterThanOrEqual(1);
    expect(docs[0]).toHaveProperty("header");
  });
});

describe("DELETE /dashboard/documents/:id", () => {
  it("deletes a document", async () => {
    // Create one to delete
    const createRes = await appRequest("/dashboard/documents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cookie,
      body: JSON.stringify({
        header: "To Delete",
        type: "Memo",
        status: "Draft",
        target: "N/A",
        limit: "0",
        reviewer: "carol",
      }),
    });
    const { id } = (await createRes.json()) as Document;

    const deleteRes = await appRequest(`/dashboard/documents/${id}`, {
      method: "DELETE",
      cookie,
    });
    expect(deleteRes.status).toBe(204);

    // Verify it's gone
    const listRes = await appRequest("/dashboard/documents", { cookie });
    const docs = (await listRes.json()) as Document[];
    expect(docs.find((d) => d.id === id)).toBeUndefined();
  });
});
