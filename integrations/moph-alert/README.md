---
name: MOPH Alert (แจ้งเตือนประชาชน)
slug: moph-alert
system: กระทรวงสาธารณสุข — สำนักสุขภาพดิจิทัล (BDH) · หมอพร้อม
direction: push              # ส่งข้อความแจ้งเตือนถึงประชาชน
base_url: bdh.moph.go.th
auth: OAuth via Provider ID (TBD)
encryption: TLS
data_standard: JSON (custom)
version: rev. 2024-08-30
status: draft
source_doc: source/   # TODO: API MOPH ALERT หมอพร้อม (PDF 2024-09)
source_updated: 2024-08-30
contact_apikey: provider.id@moph.go.th
---

# MOPH Alert (แจ้งเตือนประชาชน)

ส่งข้อความแจ้งเตือนถึงประชาชน (นัดหมาย, อัปเดตบริการ, แบบสอบถาม) ผ่าน **หมอพร้อม LINE Official Account + แอป** จากหน่วยบริการ

> **สถานะ: draft** — มี API doc แล้ว (BDH, 2024-09) ดึงมาวางใน `source/` แล้วถอด spec ได้เลย

- **spec เต็ม:** [`spec.md`](spec.md) (ยังเป็นโครง)
- **changelog:** [`changelog.md`](changelog.md)

## ภาพรวม (Overview)

- หน่วยบริการ push ข้อความ (นัดหมาย/แจ้งผล/survey) → ผู้ป่วยรับผ่าน หมอพร้อม LINE OA + แอป

## Authentication

- OAuth ผ่าน Provider ID — TBD ยืนยัน scope

## ข้อควรระวัง / Gotchas / TODO

- [ ] ดาวน์โหลด "API MOPH ALERT หมอพร้อม" (update 30-8-67) มาวางใน `source/`
- [ ] ถอด endpoint + payload (มี API doc พร้อมแล้ว — ทำได้เร็ว)
- [ ] ยืนยัน scope/permission

## แหล่งอ้างอิง

- API MOPH ALERT หมอพร้อม (PDF) — https://bdh.moph.go.th/site/wp-content/uploads/2024/09/Final_API-moph-alert-หมอพร้อม-update-30-8-67.pdf
- สำนักสุขภาพดิจิทัล (BDH) — https://bdh.moph.go.th/site/
