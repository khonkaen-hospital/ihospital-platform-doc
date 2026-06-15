---
name: MOPH Certificate (ใบรับรองแพทย์ดิจิทัล)
slug: moph-certificate
system: กระทรวงสาธารณสุข — สำนักสุขภาพดิจิทัล (BDH) · หมอพร้อม
direction: push              # ออก/ส่งใบรับรองแพทย์ดิจิทัล
base_url: mohpromt.moph.go.th
auth: OAuth via Provider ID + digital signature
encryption: TLS + digital signature
data_standard: TBD (เอกสารลงนามดิจิทัล)
version: TBD
status: draft
source_doc: source/   # TODO: API doc MOPH Certificate
source_updated: 2024-01-01
contact_apikey: provider.id@moph.go.th
---

# MOPH Certificate (ใบรับรองแพทย์ดิจิทัล)

ระบบออกใบรับรองแพทย์อิเล็กทรอนิกส์พร้อม **digital signature** ผ่าน หมอพร้อม Station — ผู้ป่วยรับใบรับรองในแอป หมอพร้อม

> **สถานะ: draft** — ต้องดึง API doc มาวางใน `source/`

- **spec เต็ม:** [`spec.md`](spec.md) (ยังเป็นโครง)
- **changelog:** [`changelog.md`](changelog.md)

## ภาพรวม (Overview)

- ออกใบรับรองแพทย์ดิจิทัล (digital signature) จากหน่วยบริการ → ส่งเข้าแอปผู้ป่วย
- เชื่อมผ่าน หมอพร้อม Station / Provider ID

## Authentication

- OAuth ผ่าน Provider ID + ลงนามดิจิทัล — TBD รายละเอียด key/signature

## ข้อควรระวัง / Gotchas / TODO

- [ ] ดึง API doc MOPH Certificate มาวางใน `source/`
- [ ] ยืนยันกลไก digital signature (cert/key ของแพทย์/หน่วยบริการ)
- [ ] ทำ moph-provider-id ก่อน

## แหล่งอ้างอิง

- MOPH Certificate — https://mohpromt.moph.go.th/mpc/mp-pf/mophcertificate/
- สำนักสุขภาพดิจิทัล (BDH) — https://bdh.moph.go.th/site/
