import { describe, expect, it } from "vitest";
import {
  ORGANIZATION_ID,
  PLATFORM_PHASES,
  PROJECT_IDENTITY,
  assertProductionNotReady
} from "./project";

describe("project identity", () => {
  it("uses the canonical 3B Motors organization ID", () => {
    expect(ORGANIZATION_ID).toBe("org_3b_motors_et");
    expect(PROJECT_IDENTITY.canonicalOrganizationId).toBe("org_3b_motors_et");
  });

  it("keeps production status as not ready during Phase 0", () => {
    expect(assertProductionNotReady()).toBe(true);
    expect(PROJECT_IDENTITY.productionStatus).toBe("notReady");
  });

  it("defines all 27 platform phases", () => {
    expect(PLATFORM_PHASES).toHaveLength(27);
    expect(PLATFORM_PHASES[0]?.name).toBe("Starter App and Project Identity");
    expect(PLATFORM_PHASES[26]?.name).toBe("Final Polish and Handoff");
  });
});
