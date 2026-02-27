# OneDrive for Business Connector

<span class="badge badge-green">Standard</span>

## Bu Bağlayıcı Nedir? / What is This Connector?

**TR:** OneDrive for Business, Microsoft 365 hesabınıza bağlı kişisel bulut depolama alanınızdır — ancak iş hesabıyla, yani şirket kontrolünde. Kendi belgelerinizi, şablonlarınızı ve özel dosyalarınızı burada saklarsınız. Power Automate bu bağlayıcı ile OneDrive'daki dosyaları otomatik olarak oluşturabilir, okuyabilir, taşıyabilir, dönüştürebilir ve paylaşabilir.

> **TR Fark:** SharePoint — ekip/departman depolama. OneDrive for Business — kişisel iş depolama.

**EN:** OneDrive for Business is your personal cloud storage tied to your Microsoft 365 work account — it's your own space for documents, templates, and private files. Power Automate can automatically create, read, move, convert, and share files stored here without manual intervention.

> **EN Note:** SharePoint = team/department storage. OneDrive for Business = personal work storage. Same connector pattern, different scope.

---

## Ne Zaman Kullanılır? / When Would You Use It?

**TR — Tipik senaryolar:**
- Harici bir URL'den dosya indir ve OneDrive'a kaydet
- Word/Excel/PowerPoint dosyasını otomatik PDF'e dönüştür ve e-postayla gönder
- Belirli bir klasördeki tüm dosyaları işle (tarama, yeniden adlandırma, taşıma)
- Yeni oluşturulan dosyaların bir bağlantısını otomatik olarak Teams'e paylaş
- Eski veya işlenmiş dosyaları arşiv klasörüne taşı

**EN — Typical scenarios:**
- Download a file from an external URL → save it to OneDrive automatically
- Word/Excel/PowerPoint → auto-convert to PDF → email it as an attachment
- New file created → instantly share a link to a Teams channel
- Bulk process all files in a folder (scan, rename, move)
- Move old/processed files to an archive folder

---

## Nasıl Başlanır? / How to Start (First Steps)

**TR:**
1. Akışa `Create file` eylemini ekleyin
2. **Folder Path:** Dosyanın kaydedileceği klasörü seçin (ör. `/Raporlar`)
3. **File Name:** Dosya adını girin (dinamik içerik kullanabilirsiniz, ör. `Rapor-@{formatDateTime(utcNow(),'yyyy-MM-dd')}.pdf`)
4. **File Content:** Dosyanın içeriğini bir önceki adımdan gelen veriyle doldurun

**EN:**
1. Add `Create file` action to your flow
2. **Folder Path:** Pick the destination folder (e.g. `/Reports`)
3. **File Name:** Enter a name — use dynamic content (e.g. `Report-@{formatDateTime(utcNow(),'yyyy-MM-dd')}.pdf`)
4. **File Content:** Fill with binary content from a previous action

---

## Key Actions / Temel Eylemler

| Eylem / Action | Açıklama / Description |
|----------------|------------------------|
| `Create file` | Yeni dosya yükle / Upload a new file |
| `Update file` | Dosya içeriğini değiştir / Replace file content |
| `Get file content` | Dosya içeriğini indir (binary) / Download file as binary |
| `Get file content using path` | Aynısı, dosya yoluyla / Same, using file path |
| `Get file metadata` | Dosya özelliklerini oku / Read file properties |
| `Get file metadata using path` | Aynısı, yolla / Same, by path |
| `List files in folder` | Klasördeki dosyaları listele / List files in a given folder |
| `List files in root folder` | Kök klasördeki dosyaları listele / List files in root |
| `Delete file` | Dosyayı sil / Remove a file |
| `Move or rename a file` | Taşı veya yeniden adlandır / Relocate or rename |
| `Copy file` | Dosyayı kopyala / Duplicate a file |
| `Upload file from URL` | URL'den dosya indir ve kaydet / Download from a URL and save |
| `Create share link` | Paylaşım bağlantısı oluştur / Generate a sharing URL |
| `Create share link by path` | Aynısı, yolla / Same, using path |
| `Convert file` | PDF, HTML vb. dönüştür / Convert to PDF, HTML, etc. |

---

## Path vs ID / Yol mu ID mi?

**TR:** Çoğu eylem hem **dosya ID'si** hem de **dosya yolu** kabul eder:

**EN:** Most actions accept either a **file ID** (opaque string) or a **file path** (human-readable):

```
# Yol / Path example
/Raporlar/2024/Ocak.xlsx
/Reports/2024/January.xlsx

# ID example
01ABCDE...  (from a previous list or trigger action)
```

> 💡 **TR:** Aynı akış içinde oluşturulan dosyalara başvururken **ID** kullanın — daha hızlı ve yol kodlama sorunlarından kaçınır. / **EN:** For files created in the same flow, use the **ID** from the create action — faster and avoids path encoding issues.

---

## Upload a File from a URL / URL'den Dosya Yükle

**TR:** Harici bir bağlantıdan dosya indirip OneDrive'a kaydetmek için:

```json
Eylem / Action: Upload file from URL
Kaynak URL / Source URL: https://example.com/report.pdf
Hedef Yol / Destination File Path: /İndirmeler/rapor-@{formatDateTime(utcNow(),'yyyy-MM-dd')}.pdf
Üzerine Yaz / Overwrite: Yes
```

---

## Convert a File to PDF / Dosyayı PDF'e Dönüştür

**TR:** Word, Excel, PowerPoint veya görüntü dosyalarını otomatik PDF'e çevirin:

```json
Eylem / Action: Convert file
Dosya / File: [file ID or path]
Hedef Tür / Target type: PDF
```

> 💡 **TR:** Desteklenen formatlar: Word (.docx), Excel (.xlsx), PowerPoint (.pptx), görüntüler → PDF. / **EN:** Supports: Word, Excel, PowerPoint, images → PDF.

---

## Create a Sharing Link / Paylaşım Bağlantısı Oluştur

```json
Eylem / Action: Create share link
Dosya / File: [file ID]
Bağlantı Türü / Link type: View          # View, Edit, veya Embed
Kapsam / Link scope: Organization        # Anyone, Organization, veya SpecificPeople
```

**TR:** `webUrl` döner — bunu e-posta veya Teams mesajına gömerek dosyayı anında paylaşabilirsiniz.

**EN:** Returns `webUrl` — embed this link in emails or Teams messages to share the file instantly.

---

## Common Mistakes / Sık Yapılan Hatalar

| Hata / Mistake | Çözüm / Fix |
|----------------|-------------|
| Yol bulunamadı / Path not found | `/` ile başlamalı, ileri eğik çizgi kullanılmalı / Must start with `/`, use forward slashes |
| Dosya kilitli / File locked | Akış çalışırken tarayıcıda dosyayı açmayın / Don't have the file open in the browser |
| 409 Çakışma hatası / 409 Conflict error | `Overwrite: Yes` ayarlayın / Set Overwrite: Yes |
| Paylaşım bağlantısı dışarıdan çalışmıyor | Kapsamı `Anyone` olarak ayarlayın (yönetici politikası izin veriyorsa) / Set scope to `Anyone` |
| Büyük dosya yükleme başarısız | 60 MB+ dosyalar için Graph API üzerinden parçalı yükleme kullanın / Use chunked upload via Graph API |

---

## Pro Tips / İpuçları

- **`Convert file`** ile Word şablonlarından otomatik PDF rapor üretin / Generate PDF reports from Word templates.
- **`Upload file from URL`** + **`Create share link`** → harici dosyayı kaydet ve anında paylaş / Save an external file and instantly share it.
- **`List files in folder`** + **`Apply to each`** → bir klasördeki tüm dosyaları toplu işleyin / Bulk-process all files in a folder.
- Dinamik dosya yolları oluştururken **yol tabanlı** eylemleri kullanın / Use path-based actions when building file paths dynamically in expressions.
