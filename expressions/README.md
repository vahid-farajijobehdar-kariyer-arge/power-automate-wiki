# Expressions Reference

<span class="badge badge-purple">Advanced</span>

Expressions unlock the full power of Power Automate. They're written in the **Workflow Definition Language** — a subset of Azure Logic Apps' expression language.

---

## Where to Use Expressions

Click any field in any action → click the `fx` tab in the dynamic content panel → type your expression.

Expressions are wrapped in `@{ }` when mixed with text:
```
Subject: Report for @{formatDateTime(utcNow(), 'MMMM yyyy')} is ready
```

Or used standalone (no wrapper):
```
@{length(body('Get_items')?['value'])}
```

---

## Expression Categories

| Category | Page |
|----------|------|
| String / Text functions | [→](string) |
| Date / Time functions | [→](date) |
| Array functions | [→](array) |
| Logical & Comparison | [→](logical) |
| Conversion functions | [→](conversion) |

---

## Most Used Expressions (Quick Reference)

```
# Current date as string
formatDateTime(utcNow(), 'yyyy-MM-dd')

# Get a field safely (null-safe)
coalesce(triggerBody()?['OptionalField'], 'default')

# Count items in array
length(body('Get_items')?['value'])

# Check if array is empty
empty(body('Get_items')?['value'])

# Format a number
string(variables('counter'))

# Random GUID
guid()

# Base64 encode
base64(body('Get_file_content'))

# Parse JSON string
json(variables('jsonString'))

# Access nested field
triggerBody()?['Author']?['DisplayName']
```

---

## Safe Navigation with `?`

Use `?['field']` (not `['field']`) to avoid errors when a field might be null:

```
# Risky — fails if Author is null:
triggerBody()['Author']['DisplayName']

# Safe — returns null if Author or DisplayName is missing:
triggerBody()?['Author']?['DisplayName']
```

---

## Referencing Action Outputs

```
# Body of an action
body('Action_name')

# Specific field from action body
body('Action_name')?['fieldName']

# HTTP status code
outputs('HTTP_action')['statusCode']

# A specific header from HTTP response
outputs('HTTP_action')?['headers']?['Content-Type']

# Trigger body
triggerBody()

# Trigger outputs (headers, URI, etc.)
triggerOutputs()

# Output of a Compose action
outputs('Compose_name')

# Output of an Apply to each — current item
items('Apply_to_each_name')
```

> 💡 Action names in expressions use underscores for spaces and special characters. "Send an email" becomes `Send_an_email`. Check the exact name in the action's title bar.
