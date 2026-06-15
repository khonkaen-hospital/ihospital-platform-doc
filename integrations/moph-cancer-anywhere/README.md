---
name: Cancer Anywhere (มะเร็งรักษาทุกที่)
slug: moph-cancer-anywhere
system: สถาบันมะเร็งแห่งชาติ (National Cancer Institute)
direction: push + pull       # ส่งต่อ/ดูประวัติมะเร็ง
base_url: TBD
auth: QR Code + Token
encryption: TLS
data_standard: TBD
version: TBD
status: draft
source_doc: source/   # TODO: API doc Cancer Anywhere
source_updated: 2024-01-01
contact_apikey: ผ่านสถาบันมะเร็งแห่งชาติ
---

# Cancer Anywhere (มะเร็งรักษาทุกที่)

ระบบส่งต่อและเข้าถึงประวัติการรักษาผู้ป่วยมะเร็งข้ามหน่วยบริการ — ส่งต่อด้วย QR Code + Token

> **สถานะ: draft** — ต้องดึง API doc มาวางใน `source/`

- **spec เต็ม:** [`spec.md`](spec.md) (ยังเป็นโครง)
- **changelog:** [`changelog.md`](changelog.md)

## ภาพรวม (Overview)

- ผู้ป่วย/หน่วยบริการสร้าง QR Code + Token เพื่อส่งต่อประวัติ
- ดูประวัติการรักษามะเร็งข้าม รพ.

## ข้อควรระวัง / Gotchas / TODO

- [ ] ยืนยันว่ามี API สำหรับ HIS หรือเป็น app-only
- [ ] ดึง API/integration doc มาวางใน `source/`
- [ ] เจ้าของคือสถาบันมะเร็งแห่งชาติ (กรมการแพทย์) — ช่องทางต่างจาก สป.สธ.

## แหล่งอ้างอิง

- Cancer Anywhere (App Store) — https://apps.apple.com/th/app/cancer-anywhere/id1544198231
- แนวทางมะเร็งรักษาทุกที่ — https://www.nhso.go.th/news/4096
