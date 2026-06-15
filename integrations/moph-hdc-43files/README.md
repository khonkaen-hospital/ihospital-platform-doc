---
name: HDC — 43 แฟ้ม (Standard Data Set)
slug: moph-hdc-43files
system: กระทรวงสาธารณสุข — กองยุทธศาสตร์และแผนงาน สป.สธ.
direction: push              # ส่งข้อมูลบริการขึ้น HDC (บังคับทุก รพ.)
base_url: spd.moph.go.th / HDC จังหวัด   # TBD endpoint จริง
auth: credential หน่วยบริการ (TBD)
encryption: none (TLS)
data_standard: โครงสร้าง 43 แฟ้ม + ICD-10-TM / ICD-9-CM
version: ดูเวอร์ชันโครงสร้างมาตรฐานล่าสุดจาก สป.สธ.
status: draft
source_doc: source/   # TODO: โครงสร้างมาตรฐานข้อมูล 43 แฟ้ม
source_updated: 2024-01-01
contact_apikey: ผ่าน admin HDC จังหวัด / ict.moph.go.th
---

# HDC — 43 แฟ้ม (Standard Data Set)

มาตรฐานการส่งข้อมูลบริการสุขภาพที่ **บังคับทุกโรงพยาบาล** ส่งขึ้น **Health Data Center (HDC)** ผ่าน HDC จังหวัด → HDC กลาง สป.สธ. เป็นรากฐานของข้อมูลสุขภาพระดับชาติ

> **สถานะ: draft** — ต้องนำโครงสร้าง 43 แฟ้มเวอร์ชันล่าสุดมาวางใน `source/` แล้วถอดเป็น spec

- **spec เต็ม:** [`spec.md`](spec.md) (ยังเป็นโครง)
- **changelog:** [`changelog.md`](changelog.md)

## ภาพรวม (Overview)

- 43 แฟ้มข้อมูลมาตรฐาน (เช่น PERSON, SERVICE, DIAGNOSIS, DRUG, LABFU ...) — โครงสร้างคงที่กำหนดโดย สป.สธ.
- ส่งผ่านบริการ upload ของ HDC: ตรวจ import + ผลได้ทันที, report กลุ่มมาตรฐานประมวลผล ~24 ชม.
- ใช้รหัสมาตรฐาน: ICD-10-TM / ICD-9-CM, รหัสหน่วยบริการ, รหัสมาตรฐานสุขภาพแห่งชาติ

## Authentication

- ผ่านระบบ HDC จังหวัด (credential หน่วยบริการ) — TBD ยืนยันวิธี

## ข้อควรระวัง / Gotchas / TODO

- [ ] ดึงเอกสาร "โครงสร้างมาตรฐานข้อมูลด้านการแพทย์และสุขภาพ (43 แฟ้ม)" เวอร์ชันล่าสุดมาวางใน `source/`
- [ ] ตรวจ mapping field HIS ของเรา → 43 แฟ้ม
- [ ] ยืนยัน endpoint/วิธี upload ของ HDC จังหวัดขอนแก่น
- [ ] สอดคล้องกับ terminology กลาง (ICD-10-TM, TMT) — ดู reference กลางของ repo

## แหล่งอ้างอิง

- ข้อมูลสุขภาพ / โครงสร้าง 43 แฟ้ม — https://spd.moph.go.th/health-data/
- คู่มือ HDC — https://spd.moph.go.th/wp-content/uploads/2023/07/HDC-v201812.pdf
- admin HDC — https://ict.moph.go.th/
