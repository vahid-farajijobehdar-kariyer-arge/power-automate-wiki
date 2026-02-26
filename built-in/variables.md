# Variables

<span class="badge badge-blue">Built-in</span>

Variables let you **store and update values** during a flow run — counters, accumulated results, flags, and more.

---

## Variable Actions

| Action | Description |
|--------|-------------|
| `Initialize variable` | Declare a new variable with a type and optional initial value |
| `Set variable` | Overwrite a variable with a new value |
| `Append to string variable` | Add text to a string variable |
| `Append to array variable` | Add an item to an array variable |
| `Increment variable` | Add a number to an integer/float variable |
| `Decrement variable` | Subtract a number from an integer/float variable |

---

## Variable Types

| Type | Example values |
|------|---------------|
| `String` | `"Hello"`, `""`, `"2024-01-01"` |
| `Integer` | `0`, `42`, `-10` |
| `Float` | `3.14`, `99.9` |
| `Boolean` | `true`, `false` |
| `Array` | `[]`, `["a","b","c"]`, `[1,2,3]` |
| `Object` | `{}`, `{"key": "value"}` |

---

## Initialize Variable

> ⚠️ You must initialize a variable **before** the first loop or condition that uses it. You cannot initialize inside an `Apply to each`.

```json
Name:  counter
Type:  Integer
Value: 0
```

```json
Name:  resultList
Type:  Array
Value: []
```

---

## Common Patterns

### Counter in a Loop

```
Initialize: counter = 0

Apply to each [items]:
  Do some processing…
  Increment variable: counter += 1

After loop:
  counter = total items processed
```

### Building an Array of Results

```
Initialize: successList = []   (Array)
Initialize: failList    = []   (Array)

Apply to each [items]:
  Try to process item
  If success → Append to array: successList ← items('...')?['Id']
  If failure → Append to array: failList    ← items('...')?['Id']

After loop:
  Send email with successList and failList counts
```

### Flag / Switch

```
Initialize: hasError = false   (Boolean)

Apply to each:
  Condition: if action fails
    Set variable: hasError = true

After loop:
  Condition: hasError = true?
    Yes → Send alert email
```

### Accumulating a String

```
Initialize: emailBody = ""

Apply to each [items]:
  Append to string variable:
    emailBody += "• @{items('...')?['Title']}\n"

After loop:
  Send email: Body = emailBody
```

---

## Object Variable

Object variables let you store structured data:

```json
Initialize:
  Name: currentUser
  Type: Object
  Value: {}

Set variable:
  Name: currentUser
  Value:
  {
    "name":  "@{triggerBody()?['name']}",
    "email": "@{triggerBody()?['email']}",
    "role":  "Editor"
  }
```

Access fields: `variables('currentUser')?['name']`

---

## Important Limitations

| Limitation | Workaround |
|-----------|------------|
| Cannot initialize inside `Apply to each` | Initialize before the loop |
| Cannot read/write in parallel branches | Use `Compose` actions instead |
| Array append is slow for thousands of items | Use `Select` + `union()` instead of repeated appends |
| No typed arrays (Array of strings) | Arrays accept mixed types — validate with expressions |

---

## Variables vs Compose

| Use Variable when… | Use Compose when… |
|--------------------|-------------------|
| Value changes over time (counter, accumulator) | Value computed once and referenced later |
| You need to persist across loop iterations | You're inside a parallel branch |
| You need Append, Increment, Decrement | You just need to capture an expression result |

```
# Compose example — one-time computed value, no state changes needed
Compose: formatDateTime(utcNow(), 'yyyy-MM-dd')

# Reference it later as:
outputs('Compose_date')
```

---

## Pro Tips

- **Name variables clearly** — `tempCounter` vs `processedItemCount`. Long flows have many variables.
- Always **initialize at the top** of the flow, not buried inside conditions — easier to find and debug.
- Use `json()` to cast a string variable to an object: `json(variables('myStringVar'))`.
- For complex state, prefer an **Object variable** over multiple separate variables.
- Check variable values during a **test run** — expand the action in the run history to see the value at that moment.
