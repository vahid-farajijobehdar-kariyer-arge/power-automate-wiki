# Text Functions

<span class="badge badge-blue">Built-in</span>

While the **Text Functions** action group contains only two actions (`Find text position` and `Substring`), the real power is in **string expressions** available throughout Power Automate.

---

## Dedicated Text Actions

| Action | Description |
|--------|-------------|
| `Find text position` | Returns the zero-based index of a substring |
| `Substring` | Extracts part of a string by start index and length |

> 💡 These actions exist for backwards compatibility. In practice, use the expression equivalents `indexOf()` and `substring()` directly in any field — no extra action needed.

---

## Complete String Expression Reference

### Case Conversion

```
toLower('Hello World')          → "hello world"
toUpper('Hello World')          → "HELLO WORLD"
```

### Trim Whitespace

```
trim('  hello  ')               → "hello"
trimStart('  hello  ')          → "hello  "
trimEnd('  hello  ')            → "  hello"
```

### Check / Search

```
contains('Hello World', 'World')         → true
startsWith('Hello World', 'Hello')       → true
endsWith('report.pdf', '.pdf')           → true
indexOf('Hello World', 'World')          → 6    (0-based)
lastIndexOf('path/to/file.txt', '/')     → 7
```

### Extract

```
substring('Hello World', 6)              → "World"   (from index 6 to end)
substring('Hello World', 6, 3)           → "Wor"     (index 6, length 3)
first('Hello')                           → "H"
last('Hello')                            → "o"
```

### Replace / Remove

```
replace('Hello World', 'World', 'PA')   → "Hello PA"
replace('a,b,,c', ',,', ',')            → "a,b,c"
```

### Split and Join

```
split('a,b,c,d', ',')                   → ["a","b","c","d"]
join(split('a,b,c', ','), ' | ')        → "a | b | c"
```

### Length and Indexing

```
length('Hello')                          → 5
empty('')                                → true
empty('text')                            → false
```

### Concatenation

```
concat('Hello', ' ', 'World')           → "Hello World"
# Or use string interpolation:
@{'Hello ' + triggerBody()?['name']}
```

---

## Real-World Text Patterns

### Extract filename from path

```
# Path: "/Reports/2024/January_Sales.xlsx"
# Get just the filename:

last(split(triggerBody()?['Path'], '/'))
→ "January_Sales.xlsx"

# Remove extension:
first(split(last(split(triggerBody()?['Path'], '/')), '.'))
→ "January_Sales"
```

### Extract first name from full name

```
# Full name: "John Smith"
substring(
  triggerBody()?['FullName'],
  0,
  indexOf(triggerBody()?['FullName'], ' ')
)
→ "John"
```

### Extract email domain

```
last(split(triggerBody()?['Email'], '@'))
→ "company.com"
```

### Build a slug (URL-safe string)

```
toLower(replace(replace(triggerBody()?['Title'], ' ', '-'), '/', '-'))
```

### Pad a number with leading zeros

```
# Pad to 5 digits:  42 → "00042"
concat(substring('00000', 0, sub(5, length(string(variables('counter'))))), string(variables('counter')))
```

### Check email domain

```
endsWith(toLower(triggerBody()?['Email']), '@company.com')
```

---

## Multi-line Text / Line Breaks

```
# Add a newline in a string
concat('Line 1', '\n', 'Line 2')

# In HTML email content
concat('<p>Line 1</p>', '<p>Line 2</p>')

# Split multiline text into array
split(triggerBody()?['MultilineField'], '\n')
```

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Index is 0-based — forgot this | `substring('Hello', 1)` gives `"ello"` not `"Hello"` |
| `indexOf` returns -1 when not found | Check first: `if(equals(indexOf(str, sub), -1), 'not found', ...)` |
| `null` input to `substring` | Wrap with `coalesce(field, '')` before operating |
| Forgot to trim before comparing | `equals(trim(toLower(field)), 'active')` |
| Splitting on wrong delimiter | Log the raw string in a Compose to see the actual content |
