# ⚡ Power Automate Wiki

> **The comprehensive, community-driven reference for Microsoft Power Automate** — connectors, expressions, patterns, real-world examples, and everything in between.

<span class="badge badge-blue">Cloud Flows</span>
<span class="badge badge-green">Desktop Flows</span>
<span class="badge badge-purple">Expressions</span>
<span class="badge badge-orange">Best Practices</span>

---

## What You'll Find Here

This wiki is structured so you can **read it from top to bottom** (like a book) or **jump straight to what you need** (like a reference). Use the sidebar or search bar above.

```mermaid
graph LR
    A([🔔 Trigger]) --> B[Actions]
    B --> C{Condition}
    C -->|Yes| D[✅ Path A]
    C -->|No|  E[❌ Path B]
    D --> F([🏁 End])
    E --> F
    style A fill:#0078d4,color:#fff
    style F fill:#22c55e,color:#fff
```


### 🔌 Connector Reference

| Connector | Use case |
|-----------|----------|
| [SharePoint](connectors/sharepoint) | Lists, libraries, files, site automation |
| [Microsoft Teams](connectors/teams) | Messages, Adaptive Cards, approvals |
| [Excel Online](connectors/excel-online) | Tables, rows, Office Scripts |
| [OneDrive](connectors/onedrive) | File operations, sharing |
| [Dataverse](connectors/dataverse) | Model-driven apps, CRM data |
| [SQL Server](connectors/sql-server) | Relational DB queries, stored procs |
| [Azure DevOps](connectors/azure-devops) | Work items, pipelines, releases |
| [HTTP](connectors/http) | Any REST API, webhooks |
| [AI Builder 🤖](connectors/ai-builder) | GPT prompts, document AI, sentiment, OCR, predictions |

---

### 🛠️ Built-in Tools

| Tool | What it does |
|------|-------------|
| [Control](built-in/control) | `Condition`, `Apply to each`, `Switch`, `Scope` |
| [Variables](built-in/variables) | Store, update, increment values |
| [Data Operations](built-in/data-operations) | `Parse JSON`, `Filter array`, `Select`, `Compose` |
| [Date & Time](built-in/date-time) | Time zones, date math, formatting |
| [Text Functions](built-in/text-functions) | Substring, find, replace |

---

### 🧩 Key Patterns

- **[Error Handling →](patterns/error-handling)** — try/catch with Scope
- **[Approvals →](patterns/approvals)** — Teams Adaptive Card approval loop
- **[Child Flows →](patterns/child-flows)** — reusable sub-flows
- **[Pagination →](patterns/pagination)** — handle large result sets

---

## Reading Conventions

> 💡 **Tip boxes** like this contain pro tips and shortcuts.

> ⚠️ **Warning boxes** highlight common mistakes.

> 🔴 **Danger boxes** warn about security or data-loss risks.

Code blocks show exact expressions you can copy-paste:

```
formatDateTime(utcNow(), 'yyyy-MM-dd HH:mm')
```

Tables with a ✅ / ⚠️ / ❌ column indicate support status or recommendation level.
