# OneDrive for Business Connector

<span class="badge badge-green">Standard</span>

Create, read, update, delete, and share files stored in OneDrive for Business.

---

## Key Actions

| Action | Description |
|--------|-------------|
| `Create file` | Upload a new file |
| `Update file` | Replace file content |
| `Get file content` | Download file as binary |
| `Get file content using path` | Same, using file path instead of ID |
| `Get file metadata` | Read file properties |
| `Get file metadata using path` | Same, by path |
| `List files in folder` | List files in a given folder |
| `List files in root folder` | List files in root |
| `Delete file` | Remove a file |
| `Move or rename a file` | Relocate or rename |
| `Copy file` | Duplicate a file |
| `Upload file from URL` | Download from a URL and save |
| `Create share link` | Generate a sharing URL |
| `Create share link by path` | Same, using path |
| `Convert file` | Convert to PDF, HTML, etc. |

---

## Path vs ID

Most actions accept either a **file ID** (opaque string) or a **file path** (human-readable):

```
# Path example
/Reports/2024/January.xlsx

# ID example
01ABCDE...  (from a previous list or trigger)
```

> 💡 When referencing files created in the same flow, use the **ID** from the create/upload action — it's faster and avoids path encoding issues.

---

## Upload a File from a URL

```json
Action: Upload file from URL
Source URL: https://example.com/report.pdf
Destination File Path: /Downloads/report-@{formatDateTime(utcNow(),'yyyy-MM-dd')}.pdf
Overwrite: Yes
```

---

## Convert a File to PDF

```json
Action: Convert file
File: [file ID or path]
Target type: PDF
```

> 💡 Supports conversion of Word (.docx), Excel (.xlsx), PowerPoint (.pptx), images → PDF.

---

## Create a Sharing Link

```json
Action: Create share link
File: [file ID]
Link type: View          # View, Edit, or Embed
Link scope: Organization # Anyone, Organization, or SpecificPeople
```

Returns `webUrl` — the shareable link you can embed in emails or Teams messages.

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Path not found | Check slashes — must start with `/`, use forward slashes |
| File locked | Don't open the file in the browser while the flow runs |
| Overwrite: No causes 409 error | Set Overwrite: Yes or check existence first |
| Share link doesn't work externally | Set scope to `Anyone` (if allowed by admin policy) |
| Large file upload fails | Files over 60 MB may hit connector limits; use chunked upload via Graph API |

---

## Pro Tips

- Use **`Convert file`** to generate PDF reports from Word templates.
- Combine **`Upload file from URL`** + **`Create share link`** to save an external file and instantly share it.
- Use **`List files in folder`** + **`Apply to each`** to bulk-process all files in a folder.
- Use the **path-based** actions when building file paths dynamically in expressions.
