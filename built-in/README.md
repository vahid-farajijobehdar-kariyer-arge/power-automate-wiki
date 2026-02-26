# Built-in Tools Overview

<span class="badge badge-blue">Standard</span> <span class="badge badge-green">Always Available</span>

Built-in tools are available in **every** Power Automate plan — no premium connector needed. They form the logic backbone of every flow.

---

## Built-in Categories

| Category | Purpose |
|----------|---------|
| [Control](control) | Conditions, loops, branching, error scopes |
| [Variables](variables) | Store and manipulate values during the flow |
| [Data Operations](data-operations) | Transform, filter, join arrays and JSON |
| [Date & Time](date-time) | Time math, time zone conversion, formatting |
| [Text Functions](text-functions) | Substring, find position |
| Schedule | Recurrence trigger (time-based) |
| HTTP / Request | HTTP trigger (webhook inbound) |

---

## When to Use What

```mermaid
graph TD
    Q{What do you need?}
    Q --> A[Branch on a condition] --> Ctrl[Control → Condition]
    Q --> B[Loop through a list] --> Loop[Control → Apply to each]
    Q --> C[Store a value temporarily] --> Var[Variables]
    Q --> D[Filter or reshape an array] --> DOP[Data Operations → Filter/Select]
    Q --> E[Parse API response] --> JSON[Data Operations → Parse JSON]
    Q --> F[Get today's date] --> DT[Date & Time or expression]
    Q --> G[Extract part of a string] --> TF[Text Functions or expression]
```
