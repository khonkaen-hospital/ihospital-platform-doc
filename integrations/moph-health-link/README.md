---
name: Health Link (HIE)
slug: moph-health-link
system: สถาบันข้อมูลขนาดใหญ่ (BDI เดิม GBDi) + NT — ร่วมกับ MDES/MOPH
direction: push + pull       # แลกเปลี่ยน EMR ข้าม รพ.
base_url: healthlink.go.th
auth: consent/OAuth-based (TBD)
encryption: TLS + pseudonymization
data_standard: HL7 FHIR
version: TBD
status: draft
source_doc: source/   # TODO: API/onboarding doc ของ Health Link
source_updated: 2024-01-01
contact_apikey: ผ่าน healthlink.go.th / BDI
---

# Health Link (HIE)

แพลตฟอร์ม **Health Information Exchange (HIE)** แห่งชาติ — ให้บุคลากรเข้าถึง EMR ของผู้ป่วยข้ามโรงพยาบาลได้ (ส่งต่อ/ฉุกเฉิน/รักษาทั่วไป) เป็นกลไกทำให้ "บัตร ปชช. ใบเดียว รักษาทุกที่" ใช้ได้จริง ปัจจุบันเชื่อม 50+ รพ.

> **สถานะ: draft** — ต้องดึงเอกสาร onboarding/API มาวางใน `source/`

- **spec เต็ม:** [`spec.md`](spec.md) (ยังเป็นโครง)
- **changelog:** [`changelog.md`](changelog.md)

## ภาพรวม (Overview)

- รพ. ส่ง EMR เข้าระบบ (push) และดึงข้อมูลผู้ป่วยจาก รพ. อื่น (pull) ภายใต้ consent
- ใช้ **HL7 FHIR** เป็นมาตรฐานแลกเปลี่ยน + pseudonymization + access control
- ดูแลโดย BDI (เดิม GBDi) + NT ภายใต้ความร่วมมือ MDES และ MOPH

## Authentication

- consent-based + OAuth (TBD ยืนยันรูปแบบ)

## ข้อควรระวัง / Gotchas / TODO

- [ ] ดึงเอกสาร onboarding + FHIR profile ของ Health Link มาวางใน `source/`
- [ ] ยืนยันรูปแบบ consent ของผู้ป่วย + access control
- [ ] เทียบ FHIR profile ของ Health Link กับ moph-iot-data-hub (resource ซ้ำ?)
- [ ] เจ้าของระบบไม่ใช่ สป.สธ. โดยตรง (BDI/NT) — ช่องทางติดต่อต่างจากตัวอื่น

## แหล่งอ้างอิง

- Health Link (BDI) — https://bdi.or.th/showroom/health-link/
- ช่วยเหลือ/onboarding — https://www.healthlink.go.th/help/
- บทความ IEEE — https://ieeexplore.ieee.org/document/9552033/
