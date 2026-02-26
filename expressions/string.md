# String Functions

<span class="badge badge-purple">Advanced</span>

Full string function reference — see also [Text Functions (built-in actions)](built-in/text-functions) for the dedicated actions.

---

## Full Reference Table

| Function | Signature | Example → Result |
|----------|-----------|-----------------|
| `concat` | `concat(a, b, …)` | `concat('Hello', ' ', 'World')` → `"Hello World"` |
| `length` | `length(str)` | `length('Hello')` → `5` |
| `toLower` | `toLower(str)` | `toLower('ABC')` → `"abc"` |
| `toUpper` | `toUpper(str)` | `toUpper('abc')` → `"ABC"` |
| `trim` | `trim(str)` | `trim('  hi  ')` → `"hi"` |
| `trimStart` | `trimStart(str)` | `trimStart('  hi')` → `"hi"` |
| `trimEnd` | `trimEnd(str)` | `trimEnd('hi  ')` → `"hi"` |
| `replace` | `replace(str, find, with)` | `replace('a-b-c', '-', '/')` → `"a/b/c"` |
| `substring` | `substring(str, start[, len])` | `substring('Hello', 1, 3)` → `"ell"` |
| `indexOf` | `indexOf(str, sub)` | `indexOf('Hello', 'ell')` → `1` |
| `lastIndexOf` | `lastIndexOf(str, sub)` | `lastIndexOf('a/b/c', '/')` → `3` |
| `startsWith` | `startsWith(str, sub)` | `startsWith('Hello', 'He')` → `true` |
| `endsWith` | `endsWith(str, sub)` | `endsWith('file.pdf', '.pdf')` → `true` |
| `contains` | `contains(str, sub)` | `contains('Hello World', 'World')` → `true` |
| `split` | `split(str, delim)` | `split('a,b,c', ',')` → `["a","b","c"]` |
| `join` | `join(arr, delim)` | `join(["a","b"], ', ')` → `"a, b"` |
| `first` | `first(str)` | `first('Hello')` → `"H"` |
| `last` | `last(str)` | `last('Hello')` → `"o"` |
| `chunk` | `chunk(str, size)` | `chunk('Hello', 2)` → `["He","ll","o"]` |

---

## String Interpolation

Instead of `concat()`, you can use template-style syntax inside `@{ }`:

```
# concat() version:
concat('Hello ', triggerBody()?['name'], ', your order #', string(triggerBody()?['id']), ' is ready.')

# Template version (cleaner):
@{concat('Hello ', triggerBody()?['name'], ', your order #', string(triggerBody()?['id']), ' is ready.')}

# Mixed text + expression:
Hello @{triggerBody()?['name']}, your order #@{triggerBody()?['id']} is ready.
```

---

## Pattern: Extract from Structured Strings

```
# Email: "John Smith <john@company.com>"
# Extract email:
trim(last(split(triggerBody()?['From'], '<')), '>')

# Extract name:
trim(first(split(triggerBody()?['From'], '<')))
```

```
# URL: "https://company.sharepoint.com/sites/MyTeam/Lists/Tasks/AllItems.aspx"
# Get site name:
split(triggerBody()?['SiteUrl'], '/sites/')[1]
→ "MyTeam/Lists/Tasks/AllItems.aspx"
first(split(split(triggerBody()?['SiteUrl'], '/sites/')[1], '/'))
→ "MyTeam"
```

```
# Version string: "2.14.3"
# Get major version:
first(split(triggerBody()?['version'], '.'))
→ "2"

# Compare: is major version >= 2?
greaterOrEquals(int(first(split(triggerBody()?['version'], '.'))), 2)
```

---

## Build a Safe Filename

```
# Remove characters not safe for filenames
# Input: "Report: Q4 2024 / Sales & Marketing"
# Desired: "Report_Q4_2024_Sales_Marketing"

replace(
  replace(
    replace(
      replace(triggerBody()?['Title'], '/', '_'),
    ' ', '_'),
  ':', ''),
'&', 'and')
```

---

## Multi-line / Newlines

```
# Actual newline in a concat:
concat('Line 1', decodeURIComponent('%0A'), 'Line 2')

# HTML break for HTML email:
concat('<p>Line 1</p>', '<p>Line 2</p>')
```
