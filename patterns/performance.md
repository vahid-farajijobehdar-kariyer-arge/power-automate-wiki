# Performance Tips

<span class="badge badge-orange">Best Practice</span>

Slow flows frustrate users and can hit API throttle limits. These techniques keep flows fast and efficient.

---

## The #1 Rule: Filter at the Source

Never fetch 1000 items to process 5. Filter **server-side** with OData queries.

```
❌ Bad: Get all 10,000 SharePoint items → Apply to each → Condition inside loop → process 50

✅ Good: Get items with OData filter = "Status eq 'Active'" (returns 50) → Apply to each → process all
```

**OData filter examples:**

```
# SharePoint
Status eq 'Active' and Priority eq 1
Created ge '@{addDays(utcNow(), -7)}'

# Dataverse
cr1a2_status eq 1 and statecode eq 0

# SQL
Status = 'Pending' AND Amount > 1000
```

---

## Parallel Processing

### Parallel branches (independent actions)

Instead of:
```
[Send email] → [Post Teams message] → [Update SharePoint]   ← sequential, 3× slower
```

Use parallel branches:
```
            ┌─ [Send email]
[Trigger] → ├─ [Post Teams message]   ← all 3 run simultaneously
            └─ [Update SharePoint]
```

Click the `+` between steps → **Add a parallel branch**.

### Apply to each — concurrency

For loops, enable concurrency (Settings → Concurrency Control):

| Items to process | Concurrency | Approximate speedup |
|-----------------|-------------|---------------------|
| 1 at a time (default) | 1 | Baseline |
| 10 at a time | 10 | ~5-8× faster |
| 50 at a time (max) | 50 | ~15-25× faster |

> ⚠️ At concurrency > 1: do NOT write to variables — results will be out of order. Use `Compose` or collect results with `union()` after the loop.

---

## Select Only What You Need

Every extra field in a response is bytes transferred and memory used.

```
# SharePoint Get items — specify columns:
Select: Id,Title,Status,AssignedTo/DisplayName

# Dataverse List rows — specify fields:
Select columns: accountid,name,emailaddress1

# Graph API — $select:
$select=id,displayName,mail
```

---

## Reduce API Calls

### Batch reads
Instead of getting items one by one in a loop:
```
❌ Apply to each → Get item by ID (N API calls)
✅ Get items with IDs filter: Id in (1,2,3,…) (1 API call)
```

### Use expressions instead of actions
```
❌ Add a "Current time" action → use its output
✅ Use utcNow() expression directly — no action needed, no API call
```

### Cache values in variables
```
# If you need the same expression result multiple times:
Compose: @{formatDateTime(utcNow(), 'yyyy-MM-dd')}

# Reference once: outputs('Compose_date')  — computed once, used many times
```

---

## Avoid Nested Apply to Each

Nested loops are exponential — 100 items × 100 sub-items = 10,000 iterations.

```
❌ Apply to each (100 items)
     Apply to each (100 sub-items)   ← 10,000 iterations!

✅ Option 1: Fetch all sub-items with a single filtered query
✅ Option 2: Use Select + Filter array on the already-loaded data
✅ Option 3: Restructure data upstream (e.g., in SQL with JOINs)
```

---

## Use Child Flows to Avoid Complexity Tax

Large flows (50+ actions) get slow to load, save, and run. Break them into [child flows](child-flows) of 10-20 actions each.

---

## Timeout Budgets

| Plan | Flow run timeout |
|------|----------------|
| Standard | 30 days |
| HTTP trigger | 120 seconds (synchronous), 90 days (async with callback) |
| Single action | 2 minutes (default), configurable |

For long-running operations (data migrations, bulk processing), use **async patterns**:
1. Flow A: Start the job, return immediately
2. A background process runs
3. Flow B (scheduled): Check status and process results

---

## Monitor Performance

- Check **Flow checker** for warnings before saving.
- Review **Run history** — look at duration per action to find bottlenecks.
- Use **Analytics** (Power Platform admin center) for aggregate performance data.
- Enable **Telemetry** with Application Insights for detailed tracing.
