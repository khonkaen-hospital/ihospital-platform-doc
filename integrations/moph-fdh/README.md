---
name: MOPH Financial Data Hub (FDH)
slug: moph-fdh
system: กระทรวงสาธารณสุข สป.สธ.
direction: push              # ส่งข้อมูลการเงิน/เบิกจ่าย
base_url: fdh.moph.go.th
auth: OAuth via Provider ID (TBD)
encryption: TLS (ISO 27001 / ISO 27799)
data_standard: financial / claims (เชื่อม NHSO eClaim)
version: TBD
status: draft
source_doc: source/   # TODO: คู่มือ/มาตรฐาน FDH
source_updated: 2024-12-01
contact_apikey: ผ่าน สป.สธ. / สำนักสุขภาพดิจิทัล
---

# MOPH Financial Data Hub (FDH)

ศูนย์กลางข้อมูลด้านการเงินของกระทรวงสาธารณสุข รองรับการ **เบิกจ่ายแบบ real-time** ของนโยบาย 30 บาทรักษาทุกที่ (เฟส 2) เชื่อมข้อมูลกับ สปสช. (NHSO eClaim), ประกันสังคม และสำนักงบประมาณ

> **สถานะ: draft** — ต้องดึงคู่มือ/มาตรฐาน FDH มาวางใน `source/` ก่อนถอด spec
> ใช้ auth จาก moph-provider-id (ทำตัวนั้นก่อน)

- **spec เต็ม:** [`spec.md`](spec.md) (ยังเป็นโครง)
- **changelog:** [`changelog.md`](changelog.md)

## ภาพรวม (Overview)

- ส่งข้อมูลการเงิน/เบิกจ่ายของหน่วยบริการเข้าศูนย์กลาง เพื่อ disburse แบบ near real-time
- ออกแบบให้ทำงานร่วมกับระบบ สปสช. (eClaim), กองทุนประกันสังคม, สำนักงบประมาณ
- มาตรฐานความปลอดภัย: ISO/IEC 27001, ISO 27799

## Authentication

- คาดว่าใช้ OAuth ผ่าน Provider ID — TBD ยืนยัน

## ข้อควรระวัง / Gotchas / TODO

- [ ] ดึงคู่มือการใช้ระบบ MOPH FDH + spec การส่งข้อมูลมาวางใน `source/`
- [ ] ยืนยันความสัมพันธ์กับ NHSO eClaim (ส่งซ้ำ/แทนกัน?)
- [ ] ยืนยัน auth flow (ผ่าน Provider ID หรือ credential แยก)
- [ ] รูปแบบข้อมูล: FHIR financial module หรือ format เฉพาะของ FDH

## แหล่งอ้างอิง

- FDH สำหรับ รพ. — https://fdh.moph.go.th/hospital/
- ข่าวอบรม MOPH FDH — https://cimjournal.com/en/public-health-news/moph-financial-data-hub-moph-fdh/
- FDH บน eClaim (สปสช.) — https://eclaim.nhso.go.th/
