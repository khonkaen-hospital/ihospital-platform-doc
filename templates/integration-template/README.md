---
name: <ชื่อเต็มของ integration>
slug: <kebab-case-slug>
system: <ระบบ/เจ้าของ เช่น กระทรวงสาธารณสุข (MOPH)>
direction: <push | pull | push + pull>
base_url: <base url>
auth: <รูปแบบ auth เช่น Bearer token / API key / OAuth2>
encryption: <none | AES-256-GCM | ...>
data_standard: <เช่น HL7 FHIR + LOINC / custom JSON>
version: <เวอร์ชันเอกสารต้นฉบับ>
status: <active | draft | deprecated>
source_doc: source/<ชื่อไฟล์ต้นฉบับ>
source_updated: <YYYY-MM-DD>
contact_apikey: <ช่องทางขอ key/credential ถ้ามี>
---

# <ชื่อ integration>

<หนึ่งบรรทัดว่า integration นี้ทำอะไร เชื่อมกับระบบไหน>

- **spec เต็ม:** [`spec.md`](spec.md)
- **ต้นฉบับ:** [`source/...`](source/)
- **changelog:** [`changelog.md`](changelog.md)
- **โค้ดตัวอย่าง:** [`examples/`](examples/)

## ภาพรวม (Overview)

<สรุป endpoint/flow หลัก เป็นตารางถ้าเหมาะ>

## Authentication

<วิธี auth, ขอ credential ยังไง>

## Encryption / Security

<ถ้ามีการเข้ารหัส payload อธิบายสั้น ๆ + ชี้ไป examples/>

## ข้อควรระวัง / Gotchas

- <ความไม่สอดคล้องในเอกสาร / quirk / สิ่งที่ต้องยืนยันกับปลายทาง>
