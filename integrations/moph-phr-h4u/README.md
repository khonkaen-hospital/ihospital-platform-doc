---
name: MOPH PHR / H4U (สมุดสุขภาพประชาชน)
slug: moph-phr-h4u
system: กระทรวงสาธารณสุข — สำนักสุขภาพดิจิทัล (BDH) · หมอพร้อม
direction: push              # ส่งข้อมูลสุขภาพเข้า PHR ของประชาชน
base_url: mohpromt.moph.go.th (PHR API Gateway)
auth: OAuth via Provider ID (scope MOPH_PHR_HIE)
encryption: TLS
data_standard: HL7 FHIR (TBD ยืนยัน profile)
version: TBD
status: draft
source_doc: source/   # TODO: คู่มือ PHR API หมอพร้อม
source_updated: 2024-01-01
contact_apikey: provider.id@moph.go.th (ขอ scope MOPH_PHR_HIE)
---

# MOPH PHR / H4U (สมุดสุขภาพประชาชน)

ส่งข้อมูลสุขภาพของผู้ป่วยเข้า **Personal Health Record (PHR)** ที่ประชาชนเข้าถึงได้ผ่าน หมอพร้อม / H4U (สมุดสุขภาพประชาชน) ผ่าน **PHR API Gateway** ของกระทรวงสาธารณสุข

> **สถานะ: draft** — ต้องดึงคู่มือ PHR API มาวางใน `source/` · ใช้ scope `MOPH_PHR_HIE` จาก moph-provider-id

- **spec เต็ม:** [`spec.md`](spec.md) (ยังเป็นโครง)
- **changelog:** [`changelog.md`](changelog.md)

## ภาพรวม (Overview)

- รพ. ส่งประวัติบริการเข้า PHR Gateway → ประชาชนเห็นในแอป หมอพร้อม / H4U
- สิทธิ: `MOPH_PHR_HIE` (ส่งข้อมูล), `MOPH_PHR_DASHBOARD_REPORT` (ดู dashboard)

## Authentication

- OAuth ผ่าน Provider ID — ขอสิทธิ `MOPH_PHR_HIE` (ดู [moph-provider-id](../moph-provider-id/))

## ข้อควรระวัง / Gotchas / TODO

- [ ] ดึงคู่มือ PHR API (หมอพร้อม PHR) มาวางใน `source/`
- [ ] ยืนยัน FHIR profile / ชุดข้อมูลที่ต้องส่ง
- [ ] ต้องทำ moph-provider-id ก่อน (ได้ token + scope)

## แหล่งอ้างอิง

- คู่มือส่งข้อมูลผ่าน API หมอพร้อม — https://mwdph.in.th/wp-content/uploads/2022/11/
- H4U สมุดสุขภาพประชาชน — https://apps.apple.com/us/app/id1407130411
- สำนักสุขภาพดิจิทัล (BDH) — https://bdh.moph.go.th/site/
