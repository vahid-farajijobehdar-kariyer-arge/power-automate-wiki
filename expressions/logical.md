# Logical & Comparison Functions

<span class="badge badge-purple">Advanced</span>

---

## Comparison

| Function | Returns true when… |
|----------|--------------------|
| `equals(a, b)` | a equals b |
| `not(equals(a, b))` | a does not equal b |
| `greater(a, b)` | a > b |
| `greaterOrEquals(a, b)` | a >= b |
| `less(a, b)` | a < b |
| `lessOrEquals(a, b)` | a <= b |

```
equals(triggerBody()?['Status'], 'Active')
greater(variables('counter'), 10)
greaterOrEquals(triggerBody()?['Amount'], 1000)
not(empty(triggerBody()?['Email']))
```

## Logical Operators

```
and(equals(a, 'x'), greater(b, 5))
or(equals(status, 'A'), equals(status, 'B'))
not(contains(email, '@gmail.com'))
```

## Conditional (Inline If)

```
if(condition, valueIfTrue, valueIfFalse)

if(equals(triggerBody()?['Priority'], 1), 'Critical', 'Normal')
if(empty(triggerBody()?['Manager']), 'No Manager', triggerBody()?['Manager'])
if(greater(variables('count'), 0), concat(string(variables('count')), ' items'), 'No items')
```

## Null / Empty Checks

```
empty(value)                             # true if null, empty string, empty array, empty object
equals(value, null)                      # true if explicitly null
coalesce(value, 'default')               # returns value if not null, else 'default'
coalesce(field1, field2, 'fallback')     # returns first non-null value
```

**Safe navigation pattern:**
```
coalesce(triggerBody()?['OptionalField'], '')
```

## Type Checking

```
equals(type(value), 'String')
equals(type(value), 'Integer')
equals(type(value), 'Array')
equals(type(value), 'Object')
equals(type(value), 'Boolean')
equals(type(value), 'Null')
```

## Practical Patterns

### Multi-condition check

```
# Is the item high-priority AND overdue?
and(
  equals(item()?['Priority'], 'High'),
  less(item()?['DueDate'], utcNow())
)
```

### Three-way ternary (nested if)

```
if(
  equals(status, 'Approved'),
  '✅ Approved',
  if(
    equals(status, 'Rejected'),
    '❌ Rejected',
    '⏳ Pending'
  )
)
```

### Null-safe string comparison

```
equals(
  toLower(coalesce(triggerBody()?['Status'], '')),
  'active'
)
```
