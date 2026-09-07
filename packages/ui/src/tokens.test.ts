import { describe, expect, it } from "vitest";
import { cn } from "./lib/cn";
import { statusToneMap, threeBDesignTokens } from "./tokens";

describe("3B Motors design primitives", () => {
  it("keeps canonical brand colors stable", () => {
    expect(threeBDesignTokens.colors.threeBRed).toBe("#E31B23");
    expect(threeBDesignTokens.colors.deepBlack).toBe("#05090F");
    expect(threeBDesignTokens.colors.evGreen).toBe("#14B8A6");
  });

  it("maps partially paid to warning instead of paid success", () => {
    expect(statusToneMap.partiallyPaid).toBe("warning");
    expect(statusToneMap.paid).toBe("success");
  });

  it("joins only truthy class values", () => {
    expect(cn("a", false, undefined, "b", null)).toBe("a b");
  });
});
