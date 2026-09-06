# Security Rules

Protected routes must require:

- active user
- valid organizationId
- valid role
- required permission
- ownership where applicable

Denied access must fail closed.
Public users must never receive private operational fields.
AuditEvent is the canonical business audit ledger.
SecurityEvent is the canonical security ledger.
Both ledgers are append-only.
