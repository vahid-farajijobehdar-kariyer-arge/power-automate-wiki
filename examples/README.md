# Real-World Examples

<span class="badge badge-green">End-to-end flows</span>

These are complete, production-ready flow designs — not simplified demos. Each example covers the trigger, all actions, error handling, and expected outcomes.

---

## Available Examples

| Example | Connectors | Complexity |
|---------|-----------|------------|
| [Employee Onboarding](employee-onboarding) | SharePoint, Teams, Outlook, Dataverse | ⭐⭐⭐ |
| [IT Ticket from Teams Message](it-ticket) | Teams, Azure DevOps, SQL Server | ⭐⭐⭐ |
| [Weekly Task Report](weekly-report) | SharePoint, Excel, Outlook, Teams | ⭐⭐ |
| [Nightly Data Sync Pipeline](data-sync) | SQL Server, Dataverse, SharePoint | ⭐⭐⭐⭐ |

---

## How to Read These Examples

Each example includes:
1. **Architecture diagram** — full flow as a Mermaid flowchart
2. **Connectors used** — what you need to set up
3. **Step-by-step** — each action with exact configuration
4. **Expressions** — the exact formulas to copy-paste
5. **Outcome** — what the flow achieves

All examples include proper **error handling** (Try/Catch Scopes) — a non-negotiable for production flows.

---

## Before You Build

- [ ] Verify you have the right connectors licensed (check [Standard vs Premium](connectors/))
- [ ] Create a service account for the connections
- [ ] Test in a development environment first
- [ ] Add error handling from day one — don't add it "later"
- [ ] Document your flow — use action names and notes liberally
