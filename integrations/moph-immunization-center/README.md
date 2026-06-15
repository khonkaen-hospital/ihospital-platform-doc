---
name: MOPH Immunization Center (วัคซีน)
slug: moph-immunization-center
system: กระทรวงสาธารณสุข — สำนักสุขภาพดิจิทัล (BDH) · หมอพร้อม
direction: push + pull       # ส่งบันทึกฉีดวัคซีน / ดึงประวัติ
base_url: mohpromt.moph.go.th
auth: OAuth via Provider ID (TBD)
encryption: TLS
data_standard: HL7 FHIR (Immunization) — TBD ยืนยัน
version: TBD
status: draft
source_doc: source/   # TODO: API doc Immunization Center
source_updated: 2024-01-01
contact_apikey: provider.id@moph.go.th
---

# MOPH Immunization Center (วัคซีน)

ระบบบริหารจัดการวัคซีนของกระทรวงสาธารณสุข (หมอพร้อม) — ส่งบันทึกการฉีดวัคซีน, ดึงประวัติ, ออกใบรับรองการฉีด (Digital Health Pass)

> **สถานะ: draft** — ต้องดึง API doc มาวางใน `source/`

- **spec เต็ม:** [`spec.md`](spec.md) (ยังเป็นโครง)
- **changelog:** [`changelog.md`](changelog.md)

## ภาพรวม (Overview)

- บันทึก/ดึงประวัติการรับวัคซีน เชื่อมกับฐาน Immunization กลาง (เลข 13 หลัก)
- ออกใบรับรองวัคซีน / Digital Health Pass (QR)

## Authentication

- OAuth ผ่าน Provider ID — TBD scope

## ข้อควรระวัง / Gotchas / TODO

- [ ] ดึง API doc Immunization Center มาวางใน `source/`
- [ ] ยืนยัน scope/permission ที่ต้องใช้
- [ ] ทำ moph-provider-id ก่อน

## แหล่งอ้างอิง

- MOPH Immunization Center — https://mohpromt.moph.go.th/EN/mophic/
- ระบบบริหารจัดการวัคซีน — https://spd.moph.go.th/mohpromt/
- Digital Health Pass — https://mohpromt.moph.go.th/mpc/mp-pf/dhp/
