export type RiskLevel = "low" | "medium" | "high" | "critical";

export type RouteAccessLevel =
  | "public"
  | "authenticated"
  | "protected"
  | "adminOnly";

export type WorkspaceKey =
  | "publicWebsite"
  | "customerPortal"
  | "dealerPortal"
  | "fleetPortal"
  | "catalog"
  | "inventoryOs"
  | "operations"
  | "admin"
  | "serviceWarranty"
  | "procurement"
  | "finance"
  | "logistics"
  | "documents"
  | "integrations"
  | "aiGovernance"
  | "qa"
  | "blueprint";

export type EntityFamily =
  | "governance"
  | "identity"
  | "security"
  | "catalog"
  | "vehicleIdentity"
  | "commerce"
  | "leads"
  | "documents"
  | "customer"
  | "dealer"
  | "fleet"
  | "inventory"
  | "imports"
  | "procurement"
  | "logistics"
  | "serviceWarranty"
  | "finance"
  | "operations"
  | "support"
  | "integrations"
  | "approvals"
  | "ai"
  | "intelligence"
  | "qa";

export type RouteDefinition = {
  readonly path: string;
  readonly label: string;
  readonly workspace: WorkspaceKey;
  readonly accessLevel: RouteAccessLevel;
  readonly requiredPermission: string | null;
  readonly phase: number;
  readonly publicSafe: boolean;
};

export type EntityDefinition = {
  readonly name: string;
  readonly family: EntityFamily;
  readonly phase: number;
  readonly organizationScoped: boolean;
  readonly appendOnly: boolean;
  readonly publicReadable: boolean;
  readonly description: string;
  readonly baseFieldsRequired: boolean;
};

export type RelationshipDefinition = {
  readonly fromEntity: string;
  readonly toEntity: string;
  readonly relationship:
    | "oneToOne"
    | "oneToMany"
    | "manyToOne"
    | "manyToMany";
  readonly required: boolean;
  readonly description: string;
};

export type PermissionDefinition = {
  readonly key: string;
  readonly label: string;
  readonly riskLevel: RiskLevel;
  readonly description: string;
};

export type WorkflowDefinition = {
  readonly key: string;
  readonly label: string;
  readonly phase: number;
  readonly entity: string;
  readonly states: readonly string[];
  readonly terminalStates: readonly string[];
  readonly requiresAudit: boolean;
};

export type IntegrationPath =
  | "builtInIntegration"
  | "connector"
  | "backendFunction"
  | "customOpenAPI"
  | "developmentMCP";

export type IntegrationDefinition = {
  readonly key: string;
  readonly label: string;
  readonly category: string;
  readonly preferredPath: IntegrationPath;
  readonly phase: number;
  readonly liveAllowedWithoutEvidence: false;
};

export type ReadinessCheckDefinition = {
  readonly key: string;
  readonly phase: number;
  readonly category: string;
  readonly title: string;
  readonly severity: RiskLevel;
  readonly requiredForLaunch: boolean;
};
