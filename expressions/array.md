# Array Functions

<span class="badge badge-purple">Advanced</span>

Array functions let you work with lists of items in expressions — without needing loop actions.

---

## Quick Reference

| Function | Signature | Description |
|----------|-----------|-------------|
| `length` | `length(arr)` | Count of items |
| `first` | `first(arr)` | First item |
| `last` | `last(arr)` | Last item |
| `take` | `take(arr, n)` | First N items |
| `skip` | `skip(arr, n)` | All items after first N |
| `contains` | `contains(arr, item)` | True if item is in array |
| `empty` | `empty(arr)` | True if array is empty |
| `union` | `union(arr1, arr2)` | Merge two arrays (dedup) |
| `intersection` | `intersection(arr1, arr2)` | Items in both arrays |
| `reverse` | `reverse(arr)` | Reversed array |
| `range` | `range(start, count)` | `[start, start+1, …]` integer array |
| `indexOf` | `indexOf(arr, item)` | Index of item (-1 if not found) |
| `join` | `join(arr, delimiter)` | Concatenate to string |
| `split` | `split(str, delimiter)` | String → array |

---

## Examples

### Count and check

```
length(body('Get_items')?['value'])              # → 42
empty(variables('resultList'))                   # → true / false
contains(variables('tags'), 'urgent')            # → true / false
first(body('Get_items')?['value'])?['Title']     # → "First item title"
last(body('Get_items')?['value'])?['Id']         # → last item's ID
```

### Slice

```
take(body('Get_items')?['value'], 5)      # First 5 items
skip(body('Get_items')?['value'], 10)     # Items after first 10
```

Combine for pagination effect:
```
take(skip(array, mul(pageNum, pageSize)), pageSize)
```

### Merge arrays

```
union(variables('listA'), variables('listB'))          # Deduped union
intersection(variables('listA'), variables('listB'))   # Common items
```

### Build an array from a range

```
range(1, 12)    # [1, 2, 3, …, 12]  — useful for month loops
range(0, 5)     # [0, 1, 2, 3, 4]
```

---

## Accessing Nested Arrays

SharePoint and Dataverse return JSON like:
```json
{
  "value": [
    { "Id": 1, "Title": "Task A", "Tags": { "results": ["bug", "urgent"] } },
    { "Id": 2, "Title": "Task B", "Tags": { "results": ["feature"] }       }
  ]
}
```

Access the tags of the first item:
```
first(body('Get_items')?['value'])?['Tags']?['results']
```

Join them into a string:
```
join(first(body('Get_items')?['value'])?['Tags']?['results'], ', ')
```

---

## Array in `Filter array` Expression

```
# Items where Priority < 3
@less(item()?['Priority'], 3)

# Items where Tags contains 'urgent'
@contains(item()?['Tags']?['results'], 'urgent')

# Items created in last 7 days
@greater(ticks(item()?['Created']), ticks(addDays(utcNow(), -7)))
```

---

## Build a Lookup Table (Object)

Create a key-value lookup from an array:

```
# Array of objects: [{"code": "A", "label": "Alpha"}, …]
# Create a JSON object: {"A": "Alpha", …}

# Use Select to reshape:
Select from: @{body('Get_codes')?['value']}
Map:
{
  "@{item()?['code']}": "@{item()?['label']}"
}

# Then union all items — this is complex; usually better handled with Find
```

In practice, for lookups use `Filter array` with `first()`:
```
first(
  filter(
    body('Get_items')?['value'],
    @{equals(item()?['Code'], variables('lookupCode'))}
  )
)?['Label']
```

---

## Pro Tips

- **`first(body(…)?['value'])?['Id']`** is a fast way to get "the one matching item" after filtering.
- Use **`union(arr, arr)`** (same array twice) to deduplicate an array.
- Use **`range()`** to create numeric sequences for looping over months, pages, etc.
- **`length(body(…)?['value'])`** is much faster than looping and counting — do it with an expression.
