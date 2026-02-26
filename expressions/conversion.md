# Conversion Functions

<span class="badge badge-purple">Advanced</span>

---

## Type Conversion

| Function | From → To | Example |
|----------|-----------|---------|
| `string(value)` | any → string | `string(42)` → `"42"` |
| `int(value)` | string → integer | `int("42")` → `42` |
| `float(value)` | string → decimal | `float("3.14")` → `3.14` |
| `bool(value)` | string → boolean | `bool("true")` → `true` |
| `json(value)` | JSON string → object | `json('{"a":1}')` → object |
| `string(json)` | object → JSON string | `string(body('Parse'))` |
| `array(value)` | value → single-item array | `array('hello')` → `["hello"]` |

```
# Common patterns
string(variables('counter'))           # int → string for concatenation
int(triggerBody()?['Quantity'])         # string → int for math
json(variables('jsonString'))           # parse stored JSON string
```

## Encoding / Decoding

| Function | Description |
|----------|-------------|
| `base64(value)` | Encode string to Base64 |
| `base64ToString(value)` | Decode Base64 to string |
| `base64ToBinary(value)` | Decode Base64 to binary |
| `binary(value)` | String → binary |
| `dataUri(value)` | String → data URI |
| `dataUriToBinary(value)` | Data URI → binary |
| `dataUriToString(value)` | Data URI → string |
| `decodeBase64(value)` | Same as base64ToString |
| `encodeURIComponent(value)` | URL-encode a string |
| `decodeURIComponent(value)` | URL-decode a string |
| `uriComponent(value)` | Same as encodeURIComponent |
| `uriComponentToString(value)` | Same as decodeURIComponent |

```
# Attach file content to email
base64(body('Get_file_content'))

# Send Basic Auth header
concat('Basic ', base64(concat(variables('username'), ':', variables('password'))))

# URL-encode a query parameter
concat('https://api.example.com/search?q=', encodeURIComponent(triggerBody()?['query']))
```

## XML Handling

```
xml(body('HTTP'))              # parse XML body
xpath(xml(body), 'expression') # query XML with XPath
```

## Number Formatting

```
# Math operations
add(variables('a'), variables('b'))
sub(variables('a'), variables('b'))
mul(variables('a'), variables('b'))
div(variables('a'), variables('b'))
mod(variables('a'), variables('b'))

# Rounding
round(3.7)       → 4
floor(3.9)       → 3
ceiling(3.1)     → 4
abs(-42)         → 42
min(3, 5)        → 3
max(3, 5)        → 5

# Format as fixed decimals (use concat + string workaround)
# PA doesn't have a native toFixed(); use formatNumber in newer versions:
formatNumber(3.14159, 'F2', 'en-US')   → "3.14"
```

## Unique IDs and Random Values

```
guid()           # "a8098c1a-f86e-11da-bd1a-00112444be1e"  (UUID v4)
rand(1, 100)     # random integer between 1 and 99
```

## Hash Functions

```
# HMAC-SHA256 (for webhook signatures)
base64(hmacSha256(
  base64ToBinary(base64(triggerBody()['payload'])),
  base64ToBinary(base64(variables('secret')))
))
```
