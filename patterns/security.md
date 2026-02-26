# Security Best Practices

<span class="badge badge-red">Security</span> <span class="badge badge-orange">Production Must-Have</span>

---

## Secrets and Credentials

### Never Hard-code Secrets

> 🔴 **Never** put API keys, passwords, or tokens directly in a flow action.

```
❌ Hard-coded in HTTP action:
   Authorization: Bearer sk-abc123...

✅ Retrieved at runtime from Key Vault:
   Authorization: Bearer @{body('Get_Secret')?['value']}
```

### Use Azure Key Vault

```
Action: HTTP
Method: GET
URI:    https://YOUR-VAULT.vault.azure.net/secrets/MyApiKey?api-version=7.4
Auth:   Managed Identity (best) or Active Directory OAuth

Output: body('HTTP_Key_Vault')?['value']
```

### Use Power Platform Environment Variables

For non-critical config values (API base URLs, feature flags):
1. Power Apps / Automate → Solutions → Environment Variables
2. Create a variable with type `Secret` or `Text`
3. Reference in flow: dynamic content → Environment Variables

---

## Secure Inputs / Outputs

Prevent sensitive data from appearing in run history logs:

1. Click the action → `···` → **Settings**
2. Enable **Secure Inputs** (hides what you send to the action)
3. Enable **Secure Outputs** (hides what the action returns)

> 💡 Always enable Secure Inputs/Outputs on actions that handle passwords, tokens, PII (Personal Identifiable Information), or PHI (health data).

---

## SQL Injection Prevention

> 🔴 Never build SQL queries by concatenating user input.

```sql
❌ Vulnerable:
Execute SQL query:
  SELECT * FROM Users WHERE Name = '@{triggerBody()?['name']}'

✅ Safe: Use stored procedures with parameters
Execute stored procedure:
  Procedure: GetUserByName
  @Name: @{triggerBody()?['name']}
```

---

## Principle of Least Privilege

| Context | Best Practice |
|---------|--------------|
| Connections | Use a **service account** with minimum permissions, not admin credentials |
| SharePoint | Grant the service account only to needed sites/lists |
| SQL Server | Grant `SELECT`, `INSERT` only — not `db_owner` |
| Azure resources | Use **Managed Identity** — no passwords, auto-rotated |
| Graph API | Request only the scopes you need (e.g., `Mail.Send`, not `Mail.ReadWrite.All`) |

---

## HTTP Webhook Security

When using "When an HTTP request is received" as a trigger:

### Verify the caller

```
# Option 1: Shared secret header
Condition: @{triggerOutputs()?['headers']?['X-My-Secret']} equals @{parameters('webhookSecret')}

# Option 2: HMAC-SHA256 signature validation (GitHub style)
# Compute expected signature and compare to X-Hub-Signature-256 header
```

### Restrict to known IPs (Power Platform admin center)

Configure IP allowlisting in the Power Platform environment settings.

---

## Data Protection (GDPR / PII)

- **Mask PII in logs**: Don't log email addresses, names, or IDs in error log SharePoint lists — use anonymized identifiers.
- **Retention**: Delete flow run history older than your retention policy.
- **Data residency**: Ensure connectors store data in the right geographic region (configure in Power Platform admin center → Data policies).

---

## DLP (Data Loss Prevention) Policies

Power Platform admins can define **DLP policies** that:
- Block certain connectors from running together (e.g., SharePoint + personal email)
- Classify connectors as Business / Non-Business / Blocked

Check with your admin if you get "Connection not allowed by DLP policy" errors.

---

## Connection Sharing Security

| Scenario | Risk | Mitigation |
|----------|------|------------|
| Sharing a flow with a personal connection | Other users inherit your permissions | Use service account connections |
| Embedded credentials in shared flows | Credentials follow the flow | Use environment variables / Key Vault |
| Run-only users | They run as the connection owner | Explicitly configure connections for run-only users |

---

## Audit and Monitoring

- **Admin Analytics**: Power Platform admin center → Analytics → Power Automate
- **DLP audit logs**: Azure AD audit logs for policy violations
- **Flow run logs**: Stored 28 days by default
- **CoE (Center of Excellence) Toolkit**: Free Microsoft tool for enterprise governance of all Power Platform flows

---

## Security Checklist for Production Flows

- [ ] No hard-coded credentials
- [ ] Secrets retrieved from Key Vault or Environment Variables
- [ ] Secure Inputs/Outputs enabled on sensitive actions
- [ ] Service account used (not personal account)
- [ ] SQL uses stored procedures, not dynamic queries
- [ ] HTTP webhooks validate caller identity
- [ ] Error logs don't contain PII
- [ ] DLP policy reviewed with admin
- [ ] Run-only sharing configured correctly
- [ ] Flow ownership documented (not tied to one person's account)
