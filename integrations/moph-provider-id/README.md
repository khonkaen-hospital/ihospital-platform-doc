---
name: MOPH Provider ID / Health ID
slug: moph-provider-id
system: กระทรวงสาธารณสุข — สำนักสุขภาพดิจิทัล (BDH)
direction: pull              # ดึง profile/auth token; เป็นชั้น auth กลางของระบบอื่น
base_url: provider.id.th / moph.id.th / id.moph.go.th   # TBD ยืนยันตัวจริง
auth: OAuth2 (Bearer + client-id + secret-key)
encryption: none (TLS)
data_standard: OAuth2 / JSON profile
version: TBD (คู่มือ rev. 2024-07)
status: draft
source_doc: source/   # TODO: คู่มือการเชื่อมต่อ Provider ID ด้วย OAuth Health ID
source_updated: 2024-07-01
contact_apikey: provider.id@moph.go.th · โทร 02-590-2076-77
---

# MOPH Provider ID / Health ID

ชั้น **authentication กลาง** ของกระทรวงสาธารณสุข — ยืนยันตัวตนทั้งบุคลากร (Provider ID) และประชาชน (Health ID / MOPH ID) รองรับ QR / authen code / kiosk เป็นรากฐานของนโยบาย "บัตรประชาชนใบเดียว รักษาทุกที่"

> **สถานะ: draft** — ยังไม่ได้ถอด spec ต้องขอ credential + ดึง API doc มาวางใน `source/` ก่อน
> **ทำก่อนตัวอื่น** — เป็น prerequisite ของ FDH, PHR/H4U, MOPH Certificate ฯลฯ และใช้ contact เดียวกับ moph-iot-data-hub ที่เรามีแล้ว

- **spec เต็ม:** [`spec.md`](spec.md) (ยังเป็นโครง)
- **changelog:** [`changelog.md`](changelog.md)

## ภาพรวม (Overview)

- ลงทะเบียนหน่วยบริการ → ได้ `client-id` + `secret-key`
- OAuth flow: ขอ token → เรียก profile `{Provider-URL}/api/v1/services/profile` (GET, Bearer)
- ขอ scope/permission ตามบริการที่จะใช้ เช่น:
  - `MOPH_PHR_HIE` — สิทธิส่งข้อมูลผ่าน หมอพร้อม PHR API
  - `MOPH_PHR_DASHBOARD_REPORT` — สิทธิดู dashboard/report
- บริการที่ปลดล็อกได้: login, ขอ profile (Health ID / Provider ID), QR Health ID + authen code บน kiosk, นำเข้า/ขอชุดข้อมูล PHR, API ใบรับรองแพทย์

## Authentication

- OAuth2 — header `Authorization: Bearer <token>` + `client-id` + `secret-key`
- ลงทะเบียน 3 ขั้น: ตรวจรายชื่อ → สมัครที่ `moph.id.th/login` → สมัครที่ `provider.id.th`

## ข้อควรระวัง / Gotchas / TODO

- [ ] ดึงคู่มือ "การเชื่อมต่อ Provider ID ด้วย OAuth Health ID" (BDH, 2024-07) มาวางใน `source/`
- [ ] ยืนยัน base URL จริงของ production (มีหลายโดเมน: provider.id.th, moph.id.th, id.moph.go.th)
- [ ] ขอ client-id/secret-key จาก provider.id@moph.go.th
- [ ] ทำ list scope/permission ทั้งหมดที่ระบบเราต้องใช้

## แหล่งอ้างอิง

- คู่มือ Provider ID OAuth — https://bdh.moph.go.th/site/wp-content/uploads/2024/07/
- Flow ยื่นคำขอ — https://bdh.moph.go.th/site/wp-content/uploads/2024/08/V2_Flow_step_provider_id.pdf
- https://id.moph.go.th/
