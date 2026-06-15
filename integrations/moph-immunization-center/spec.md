# MOPH Immunization Center (วัคซีน) — API Specification (เต็ม)

> **ยังเป็นโครง (draft)** — ต้องนำเอกสารต้นฉบับมาวางใน `source/` แล้วถอดเนื้อหาลงที่นี่
> อ่านสรุป + แหล่งอ้างอิงก่อนที่ [`README.md`](README.md)

- **Base URL:** `mohpromt.moph.go.th`
- **Auth:** OAuth via Provider ID (TBD)
- **มาตรฐานข้อมูล:** HL7 FHIR (Immunization) — TBD

---

## ภาพรวม API

| # | API | Method | Endpoint | ทิศทาง |
|---|---|---|---|---|
| 1 | _(รอถอดจากต้นฉบับ — บันทึก/ดึงประวัติวัคซีน, ใบรับรอง)_ | | | push + pull |

---

## TODO ก่อนถอด spec

- [ ] ทำ moph-provider-id ก่อน
- [ ] ดึง API doc Immunization Center วางใน `source/`
- [ ] ถอด endpoint + payload + ใบรับรอง/Digital Health Pass
