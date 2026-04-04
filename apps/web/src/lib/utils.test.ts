import { cn } from "./utils.js";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("text-sm", "font-bold")).toBe("text-sm font-bold");
  });

  it("filters out falsy values", () => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    expect(cn("block", false && "hidden")).toBe("block");
  });

  it("deduplicates conflicting tailwind classes", () => {
    expect(cn("px-4", "px-2")).toBe("px-2");
  });
});
