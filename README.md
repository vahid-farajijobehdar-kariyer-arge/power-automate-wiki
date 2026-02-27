# ⚡ Power Automate Wiki

> **TR:** Microsoft Power Automate için kapsamlı referans kaynağı — bağlayıcılar, ifadeler, desenler, gerçek dünya örnekleri ve çok daha fazlası.
>
> **EN:** The comprehensive reference for Microsoft Power Automate — connectors, expressions, patterns, real-world examples, and everything in between.

<span class="badge badge-blue">Cloud Flows</span>
<span class="badge badge-green">Desktop Flows</span>
<span class="badge badge-purple">İfadeler / Expressions</span>
<span class="badge badge-orange">En İyi Uygulamalar / Best Practices</span>

---

### 🔌 Bağlayıcı Referansı / Connector Reference

| Bağlayıcı / Connector | Kullanım / Use case |
|-----------------------|---------------------|
| [SharePoint](connectors/sharepoint) | Liste, kitaplık, dosya otomasyonu / Lists, libraries, files |
| [Microsoft Teams](connectors/teams) | Mesajlar, Adaptive Card, onaylar / Messages, cards, approvals |
| [Excel Online](connectors/excel-online) | Tablolar, satırlar / Tables, rows, Office Scripts |
| [OneDrive](connectors/onedrive) | Dosya işlemleri / File operations, sharing |
| [Dataverse](connectors/dataverse) | Model tabanlı uygulama / Model-driven apps, CRM |
| [SQL Server](connectors/sql-server) | Sorgular, stored proc / Queries, stored procs |
| [Azure DevOps](connectors/azure-devops) | İş öğeleri, pipeline / Work items, pipelines |
| [HTTP](connectors/http) | REST API, webhook |
| [AI Builder 🤖](connectors/ai-builder) | GPT, belge AI, duygu analizi / GPT, document AI, sentiment, OCR |

---

### 🛠️ Yerleşik Araçlar / Built-in Tools

| Araç / Tool | Ne İşe Yarar / What it does |
|-------------|------------------------------|
| [Kontrol / Control](built-in/control) | Koşul, Döngü, Switch, Kapsam / Condition, Loop, Switch, Scope |
| [Değişkenler / Variables](built-in/variables) | Saklama, güncelleme / Store, update, increment |
| [Veri İşlemleri / Data Operations](built-in/data-operations) | JSON, Filtre, Seç / Parse JSON, Filter, Select, Compose |
| [Tarih ve Saat / Date & Time](built-in/date-time) | Saat dilimi, tarih hesabı / Time zones, date math |
| [Metin / Text Functions](built-in/text-functions) | Alt dize, bul, değiştir / Substring, find, replace |

---

### 🧩 Temel Desenler / Key Patterns

- **[Hata Yönetimi / Error Handling →](patterns/error-handling)** — Scope ile try/catch
- **[Onay Akışları / Approvals →](patterns/approvals)** — Teams Adaptive Card onay döngüsü / approval loop
- **[Alt Akışlar / Child Flows →](patterns/child-flows)** — Yeniden kullanılabilir alt akışlar / reusable sub-flows
- **[Sayfalandırma / Pagination →](patterns/pagination)** — Büyük sonuç kümeleri / large result sets

---

## Okuma Kuralları / Reading Conventions

> 💡 **İpucu / Tip** — Profesyonel ipuçları ve kısayollar / pro tips and shortcuts.

> ⚠️ **Uyarı / Warning** — Yaygın hatalar / common mistakes.

> 🔴 **Tehlike / Danger** — Güvenlik ve veri kaybı riskleri / security or data-loss risks.

Kod blokları kopyalayıp yapıştırabileceğiniz ifadeleri gösterir / Code blocks show exact expressions to copy-paste:

```
formatDateTime(utcNow(), 'yyyy-MM-dd HH:mm')
```

✅ / ⚠️ / ❌ sütunlu tablolar destek durumunu gösterir / columns indicate support status or recommendation level.

---

## Teşekkür / Acknowledgements

<div class="acknowledgement-card">

**TR:** Bu wiki, [**kariyer.net**](https://www.kariyer.net) ekibinin desteği ve katkısıyla hazırlanmıştır.

kariyer.net'e özellikle şunlar için teşekkür ederiz:

- 🔑 **Lisanslar** — Power Automate Premium lisanslarının sağlanması
- 💡 **Motivasyon** — Otomasyon kültürünün benimsenmesindeki liderlik
- 📚 **Materyaller** — Gerçek dünya senaryoları ve veri setlerinin paylaşılması
- 💬 **Geri Bildirim** — İçeriklerin şekillendirilmesine katkıda bulunan değerli yorumlar

---

**EN:** This wiki was prepared with the support and contributions of the [**kariyer.net**](https://www.kariyer.net) team.

Special thanks to kariyer.net for:

- 🔑 **Licenses** — Providing Power Automate Premium licenses
- 💡 **Motivation** — Leading the adoption of an automation-first culture
- 📚 **Materials** — Sharing real-world scenarios and datasets
- 💬 **Feedback** — Valuable input that shaped the content of this wiki

</div>
