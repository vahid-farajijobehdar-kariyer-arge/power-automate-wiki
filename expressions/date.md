# Date Functions

<span class="badge badge-purple">Advanced</span>

See also [Date & Time actions](../built-in/date-time) for the action-based approach.

---

## Full Reference

| Function | Signature | Description |
|----------|-----------|-------------|
| `utcNow` | `utcNow([format])` | Current UTC timestamp |
| `formatDateTime` | `formatDateTime(ts, format)` | Format a date string |
| `addSeconds` | `addSeconds(ts, n)` | Add N seconds |
| `addMinutes` | `addMinutes(ts, n)` | Add N minutes |
| `addHours` | `addHours(ts, n)` | Add N hours |
| `addDays` | `addDays(ts, n[, format])` | Add N days |
| `addMonths` | `addMonths(ts, n[, format])` | Add N months |
| `addYears` | `addYears(ts, n[, format])` | Add N years |
| `startOfDay` | `startOfDay(ts)` | Midnight of that day |
| `startOfHour` | `startOfHour(ts)` | Start of that hour |
| `startOfMonth` | `startOfMonth(ts)` | First day of that month |
| `dayOfWeek` | `dayOfWeek(ts)` | 0=Sun … 6=Sat |
| `dayOfMonth` | `dayOfMonth(ts)` | 1–31 |
| `dayOfYear` | `dayOfYear(ts)` | 1–366 |
| `convertTimeZone` | `convertTimeZone(ts, from, to[, format])` | Convert time zone |
| `ticks` | `ticks(ts)` | 100-ns intervals since epoch |

---

## Date Format Strings (C# / .NET)

| Format | Result |
|--------|--------|
| `yyyy-MM-dd` | 2024-01-15 |
| `dd/MM/yyyy` | 15/01/2024 |
| `MM/dd/yyyy` | 01/15/2024 |
| `yyyy-MM-ddTHH:mm:ssZ` | 2024-01-15T09:30:00Z |
| `HH:mm` | 09:30 |
| `h:mm tt` | 9:30 AM |
| `dddd, MMMM d, yyyy` | Monday, January 15, 2024 |
| `MMM d` | Jan 15 |
| `MMMM yyyy` | January 2024 |
| `ddd` | Mon |
| `D` | Monday, January 15, 2024 |
| `t` | 9:30 AM |
| `u` | 2024-01-15 09:30:00Z |

---

## Duration Between Two Dates

```
# Days between two timestamps (using ticks):
div(
  sub(ticks(triggerBody()?['EndDate']), ticks(triggerBody()?['StartDate'])),
  864000000000    # 1 day in 100-nanosecond ticks
)

# Hours between:
div(
  sub(ticks(triggerBody()?['EndDate']), ticks(triggerBody()?['StartDate'])),
  36000000000     # 1 hour in ticks
)
```

---

## OData Date Filters

```
# Today's items:
Created ge '@{startOfDay(utcNow())}' and Created lt '@{addDays(startOfDay(utcNow()), 1)}'

# This month's items:
Created ge '@{startOfMonth(utcNow())}'

# Last 7 days:
Created ge '@{addDays(utcNow(), -7)}'

# Overdue items:
DueDate lt '@{utcNow()}'
```

---

## Day of Week — Skip Weekends

```
# Is today a weekday? (0=Sun, 6=Sat)
and(
  greater(dayOfWeek(utcNow()), 0),
  less(dayOfWeek(utcNow()), 6)
)

# Next business day from a date:
if(
  equals(dayOfWeek(addDays(utcNow(), 1)), 6),  # Saturday → add 3
  addDays(utcNow(), 3),
  if(
    equals(dayOfWeek(addDays(utcNow(), 1)), 0), # Sunday → add 2
    addDays(utcNow(), 2),
    addDays(utcNow(), 1)                         # Weekday → add 1
  )
)
```

---

## Fiscal / Quarter Calculations

```
# Quarter number (assuming Jan-Mar = Q1)
add(
  div(sub(int(formatDateTime(utcNow(), 'MM')), 1), 3),
  1
)
# January (01) → (1-1)/3 + 1 = 0+1 = 1 (Q1) ✓
# April (04)   → (4-1)/3 + 1 = 1+1 = 2 (Q2) ✓

# Fiscal year start (if FY starts April 1):
if(
  greaterOrEquals(int(formatDateTime(utcNow(), 'MM')), 4),
  formatDateTime(utcNow(), 'yyyy'),
  string(sub(int(formatDateTime(utcNow(), 'yyyy')), 1))
)
```
