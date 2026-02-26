# Date & Time

<span class="badge badge-blue">Built-in</span>

Power Automate has dedicated Date/Time actions — but most date work is faster done with **expressions** directly. This page covers both.

---

## Date/Time Actions

| Action | Description |
|--------|-------------|
| `Current time` | Returns current UTC timestamp |
| `Add to time` | Add minutes/hours/days/months/years to a timestamp |
| `Subtract from time` | Subtract an interval from a timestamp |
| `Get future time` | Current time + interval (shortcut) |
| `Get past time` | Current time - interval (shortcut) |
| `Convert time zone` | Convert between time zones |

> 💡 **Skip the actions** — most of these are just wrappers around expressions. Use `utcNow()`, `addDays()`, `convertTimeZone()` directly in any field.

---

## The Most Important Expressions

### Get Current Time

```
utcNow()                    → "2024-01-15T09:30:00.0000000Z"
utcNow('yyyy-MM-dd')        → "2024-01-15"
utcNow('HH:mm')             → "09:30"
utcNow('dddd, MMMM d, yyyy') → "Monday, January 15, 2024"
```

### Format a Date

```
formatDateTime(triggerBody()?['Created'], 'yyyy-MM-dd')
formatDateTime(triggerBody()?['Created'], 'dd/MM/yyyy HH:mm')
formatDateTime(triggerBody()?['Created'], 'MMMM d, yyyy')
```

### Add / Subtract

```
addDays(utcNow(), 7)              # 7 days from now
addDays(utcNow(), -30)            # 30 days ago
addHours(utcNow(), 2)             # 2 hours from now
addMinutes(utcNow(), -15)         # 15 minutes ago
addMonths(utcNow(), 3)            # 3 months from now
addSeconds(utcNow(), 30)          # 30 seconds from now
```

With format:
```
addDays(utcNow(), 7, 'yyyy-MM-dd')    # "2024-01-22"
```

### Start/End of Day, Month, Week

```
startOfDay(utcNow())              # "2024-01-15T00:00:00.0000000Z"
startOfMonth(utcNow())            # "2024-01-01T00:00:00.0000000Z"
startOfHour(utcNow())             # "2024-01-15T09:00:00.0000000Z"
```

### Time Zone Conversion

```
# Action: Convert time zone
Base time: @{utcNow()}
Format string: yyyy-MM-dd HH:mm
Source timezone: UTC
Destination timezone: Turkey Standard Time

# Expression version:
convertTimeZone(utcNow(), 'UTC', 'Turkey Standard Time', 'yyyy-MM-dd HH:mm')
```

**Common Windows time zone names:**

| Location | Time zone name |
|----------|---------------|
| Turkey | `Turkey Standard Time` |
| UK | `GMT Standard Time` |
| Eastern US | `Eastern Standard Time` |
| Central Europe | `Central European Standard Time` |
| UAE / Gulf | `Arabian Standard Time` |
| India | `India Standard Time` |
| Japan | `Tokyo Standard Time` |

> ⚠️ Power Automate uses **Windows time zone names**, not IANA names (`Europe/Istanbul`). They are different.

### Comparing Dates

```
# Is a date in the past?
@less(triggerBody()?['DueDate'], utcNow())

# Is a date more than 7 days old?
@less(triggerBody()?['Created'], addDays(utcNow(), -7))

# Days between two dates
div(sub(ticks(triggerBody()?['EndDate']), ticks(triggerBody()?['StartDate'])), 864000000000)
```

The `ticks()` function converts a date to 100-nanosecond intervals — subtract and divide to get days.

---

## Full Date/Time Reference Table

| Expression | Example output |
|-----------|---------------|
| `utcNow()` | `2024-01-15T09:30:00.0000000Z` |
| `utcNow('yyyy-MM-dd')` | `2024-01-15` |
| `utcNow('yyyy-MM-ddTHH:mm:ssZ')` | `2024-01-15T09:30:00Z` |
| `formatDateTime(date, 'MMM yyyy')` | `Jan 2024` |
| `dayOfWeek(utcNow())` | `1` (0=Sunday) |
| `dayOfMonth(utcNow())` | `15` |
| `dayOfYear(utcNow())` | `15` |

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Wrong time zone name | Use Windows names, not IANA (`Turkey Standard Time` not `Europe/Istanbul`) |
| Comparing dates as strings | Use `ticks()` for numeric comparison |
| Forgetting UTC | All Power Automate times are UTC internally — always convert for display |
| Date format mismatch | Check the connector's expected format (ISO 8601 vs local) |
| `Current time` action not needed | Replace with `utcNow()` expression directly — saves a step |

---

## Pro Tips

- Use `utcNow()` as an expression directly in any field — no need to add the "Current time" action.
- Build date-based file names: `Report-@{utcNow('yyyy-MM-dd-HHmm')}.csv`
- Use `startOfDay(utcNow())` in OData filters to get today's items: `Created ge '@{startOfDay(utcNow())}'`
- Use `ticks()` for comparing durations — it's the most reliable method.
