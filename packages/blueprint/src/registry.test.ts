import { describe, expect, it } from "vitest";
import {
  entityRegistry,
  permissionRegistry,
  productionReadinessRegistry,
  publicForbiddenFields,
  relationshipRegistry,
  routeRegistry,
  workflowRegistry
} from "./index";

function expectUnique(values: readonly string[]) {
  expect(new Set(values).size).toBe(values.length);
}

describe("architecture blueprint registries", () => {
  it("has unique route paths", () => {
    expectUnique(routeRegistry.map((route) => route.path));
  });

  it("has unique entity names", () => {
    expectUnique(entityRegistry.map((entity) => entity.name));
  });

  it("has unique permission keys", () => {
    expectUnique(permissionRegistry.map((permission) => permission.key));
  });

  it("has unique workflow keys", () => {
    expectUnique(workflowRegistry.map((workflow) => workflow.key));
  });

  it("requires base fields for organization-scoped protected business entities", () => {
    const protectedEntities = entityRegistry.filter(
      (entity) => entity.organizationScoped && !entity.publicReadable
    );
    expect(protectedEntities.every((entity) => entity.baseFieldsRequired)).toBe(true);
  });

  it("requires registered permissions for protected routes", () => {
    const permissionKeys = new Set(permissionRegistry.map((permission) => permission.key));
    const protectedRoutes = routeRegistry.filter((route) => route.accessLevel !== "public");

    for (const route of protectedRoutes) {
      expect(route.requiredPermission).not.toBeNull();
      if (route.requiredPermission !== null) {
        expect(permissionKeys.has(route.requiredPermission)).toBe(true);
      }
    }
  });

  it("keeps relationship endpoints inside the entity registry", () => {
    const entityNames = new Set(entityRegistry.map((entity) => entity.name));

    for (const relationship of relationshipRegistry) {
      expect(entityNames.has(relationship.fromEntity)).toBe(true);
      expect(entityNames.has(relationship.toEntity)).toBe(true);
    }
  });

  it("keeps workflow entities inside the entity registry", () => {
    const entityNames = new Set(entityRegistry.map((entity) => entity.name));

    for (const workflow of workflowRegistry) {
      expect(entityNames.has(workflow.entity)).toBe(true);
    }
  });

  it("keeps stock ledger immutable and models mutation lifecycle on InventoryCommand", () => {
    const stockLedger = entityRegistry.find((entity) => entity.name === "StockLedger");
    const stockCommand = workflowRegistry.find((workflow) => workflow.key === "stockLedgerCommand");

    expect(stockLedger?.appendOnly).toBe(true);
    expect(stockCommand?.entity).toBe("InventoryCommand");
    expect(stockCommand?.terminalStates).not.toContain("reversed");
  });

  it("includes GPS serial in the public forbidden-field boundary", () => {
    expect(publicForbiddenFields).toContain("fullGpsSerial");
  });

  it("keeps production readiness checks launch-blocking where required", () => {
    expect(productionReadinessRegistry.length).toBeGreaterThanOrEqual(8);
    expect(productionReadinessRegistry.every((check) => check.requiredForLaunch)).toBe(true);
  });

  it("has relationship definitions", () => {
    expect(relationshipRegistry.length).toBeGreaterThan(5);
  });
});
