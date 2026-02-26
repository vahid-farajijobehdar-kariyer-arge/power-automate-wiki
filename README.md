# ⚡ Power Automate Wiki

> **Microsoft Power Automate için kapsamlı referans kaynağı** — bağlayıcılar, ifadeler, desenler, gerçek dünya örnekleri ve çok daha fazlası.

<span class="badge badge-blue">Cloud Flows</span>
<span class="badge badge-green">Desktop Flows</span>
<span class="badge badge-purple">İfadeler</span>
<span class="badge badge-orange">En İyi Uygulamalar</span>

---

### 🔌 Bağlayıcı Referansı

| Bağlayıcı | Kullanım Alanı |
|-----------|----------------|
| [SharePoint](connectors/sharepoint) | Liste, kitaplık, dosya ve site otomasyonu |
| [Microsoft Teams](connectors/teams) | Mesajlar, Adaptive Card, onaylar |
| [Excel Online](connectors/excel-online) | Tablolar, satırlar, Office Scripts |
| [OneDrive](connectors/onedrive) | Dosya işlemleri, paylaşım |
| [Dataverse](connectors/dataverse) | Model tabanlı uygulama ve CRM verisi |
| [SQL Server](connectors/sql-server) | İlişkisel DB sorguları, stored proc |
| [Azure DevOps](connectors/azure-devops) | İş öğeleri, pipeline, sürümler |
| [HTTP](connectors/http) | Tüm REST API ve webhook |
| [AI Builder 🤖](connectors/ai-builder) | GPT, belge AI, duygu analizi, OCR, tahmin |

---

### 🛠️ Yerleşik Araçlar

| Araç | Ne İşe Yarar |
|------|--------------|
| [Kontrol](built-in/control) | `Koşul`, `Her birine uygula`, `Switch`, `Kapsam` |
| [Değişkenler](built-in/variables) | Değer saklama, güncelleme, artırma |
| [Veri İşlemleri](built-in/data-operations) | `JSON Ayrıştır`, `Diziyi Filtrele`, `Seç`, `Oluştur` |
| [Tarih ve Saat](built-in/date-time) | Saat dilimleri, tarih hesabı, biçimlendirme |
| [Metin Fonksiyonları](built-in/text-functions) | Alt dize, bulma, değiştirme |

---

### 🧩 Temel Desenler

- **[Hata Yönetimi →](patterns/error-handling)** — Scope ile try/catch
- **[Onay İş Akışları →](patterns/approvals)** — Teams Adaptive Card onay döngüsü
- **[Alt Akışlar →](patterns/child-flows)** — Yeniden kullanılabilir alt akışlar
- **[Sayfalandırma →](patterns/pagination)** — Büyük sonuç kümelerini yönetme

---

## Okuma Kuralları

> 💡 **İpucu kutuları** profesyonel ipuçları ve kısayollar içerir.

> ⚠️ **Uyarı kutuları** yaygın hataları vurgular.

> 🔴 **Tehlike kutuları** güvenlik veya veri kaybı risklerini belirtir.

Kod blokları kopyalayıp yapıştırabileceğiniz ifadeleri gösterir:

```
formatDateTime(utcNow(), 'yyyy-MM-dd HH:mm')
```

✅ / ⚠️ / ❌ sütunlu tablolar destek durumunu veya öneri seviyesini gösterir.
