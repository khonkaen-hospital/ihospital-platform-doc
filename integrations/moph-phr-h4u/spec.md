# MOPH PHR / H4U (สมุดสุขภาพประชาชน) — API Specification (เต็ม)

> **ยังเป็นโครง (draft)** — ต้องนำเอกสารต้นฉบับมาวางใน `source/` แล้วถอดเนื้อหาลงที่นี่
> อ่านสรุป + แหล่งอ้างอิงก่อนที่ [`README.md`](README.md)

- **Base URL:** `mohpromt.moph.go.th` (PHR API Gateway)
- **Auth:** OAuth via Provider ID (scope `MOPH_PHR_HIE`)
- **มาตรฐานข้อมูล:** HL7 FHIR (TBD ยืนยัน profile)

---

## ภาพรวม API

| # | API | Method | Endpoint | ทิศทาง |
|---|---|---|---|---|
| 1 | _(รอถอดจากต้นฉบับ — push PHR dataset)_ | | | push |

---

## TODO ก่อนถอด spec

- [ ] ทำ moph-provider-id ก่อน (token + scope MOPH_PHR_HIE)
- [ ] ดึงคู่มือ PHR API หมอพร้อม วางใน `source/`
- [ ] ถอด FHIR profile / ชุดข้อมูล + endpoint + ตัวอย่าง
