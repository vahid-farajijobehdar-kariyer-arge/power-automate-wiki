# Interface Overview

<span class="badge badge-blue">Beginner</span>

A quick tour of the Power Automate designer so you know where everything is.

---

## The Designer Canvas

```
┌────────────────────────────────────────────────────────────┐
│  ← Back  |  Flow Name         |  [Save]  [Test]  [...]   │  ← Top bar
├──────────┬─────────────────────────────────────────────────┤
│          │                                                  │
│ Actions  │   [🔔 Trigger]                                  │
│ panel    │        ↓                                         │
│          │   [⚙️ Action 1]    ← Click to expand/edit       │
│ Search   │        ↓                                         │
│ and add  │   [⚙️ Action 2]                                  │
│ actions  │        ↓                                         │
│          │   [+ New step]     ← Add next action             │
└──────────┴─────────────────────────────────────────────────┘
```

---

## Key Areas

### Top Bar
| Control | Purpose |
|---------|---------|
| **Save** | Saves the flow (auto-save also runs) |
| **Test** | Run the flow immediately for debugging |
| **Flow checker** | Highlights configuration errors |
| **...** menu | Export, disable, delete, share |

### Action Card
Each action is a card. Click it to expand:

```
┌─────────────────────────────────────────────────┐
│ ✉️  Send an email (V2)              [✕] [···]   │
├─────────────────────────────────────────────────┤
│ To:      person@company.com                      │
│ Subject: @{triggerBody()?['Name']} was uploaded  │
│ Body:    Hello, a new file was uploaded…         │
│                                                  │
│ [Show advanced options ▼]                        │
└─────────────────────────────────────────────────┘
```

- **✕** — Delete this action
- **···** — Rename, copy, move up/down, add note, configure run after

### Dynamic Content Panel
Clicking inside any field opens a panel on the right with **dynamic content** (outputs from previous actions) and **Expressions**. This is how you reference data from earlier steps.

### Expression Editor
Click the `fx` tab in the dynamic content panel to write expressions:
```
formatDateTime(utcNow(), 'dddd, MMMM d, yyyy')
```

---

## Three Ways to Add an Action

1. **Click "+ New step"** — opens the action picker
2. **Click "+" between two existing steps** — inserts in the middle
3. **Search bar** — type the connector or action name directly

---

## Action Settings (···  menu)

| Setting | What it does |
|---------|-------------|
| **Rename** | Give the action a readable name (very helpful for debugging!) |
| **Copy** | Duplicate this action |
| **Delete** | Remove it |
| **Add a note** | Document what this step does |
| **Configure run after** | Control when this step runs (always, on success, on failure, on timeout) — key for error handling |
| **Settings** | Set retry policy, timeout, secure inputs/outputs |

---

## Left Sidebar (make.powerautomate.com)

| Section | Contents |
|---------|----------|
| **Home** | Featured templates, recent flows |
| **My flows** | All your personal flows |
| **Create** | Start a new flow |
| **Templates** | 1000+ pre-built flow templates |
| **Approvals** | Pending approvals sent to you |
| **Solutions** | Managed/unmanaged solutions (ALM) |
| **Connections** | All authenticated connectors |
| **Data** | Dataverse tables, flows, connections |

---

> 💡 **Tip:** Press `Ctrl+S` to save at any time. Use the **Flow checker** (in the top-right … menu) before testing to catch obvious configuration errors early.
