# Health Link (HIE) — API Specification (เต็ม)

> **ยังเป็นโครง (draft)** — ต้องนำเอกสารต้นฉบับมาวางใน `source/` แล้วถอดเนื้อหาลงที่นี่
> อ่านสรุป + แหล่งอ้างอิงก่อนที่ [`README.md`](README.md)

- **Base URL:** `healthlink.go.th`
- **Auth:** consent/OAuth-based (TBD)
- **มาตรฐานข้อมูล:** HL7 FHIR + pseudonymization

---

## ภาพรวม API

| # | API | Method | Endpoint | ทิศทาง |
|---|---|---|---|---|
| 1 | _(รอถอดจากต้นฉบับ — push EMR / pull patient record)_ | | | push + pull |

---

## TODO ก่อนถอด spec

- [ ] ดึงเอกสาร onboarding + FHIR profile วางใน `source/`
- [ ] ถอด consent flow + access control
- [ ] ถอด FHIR resource/profile ที่ใช้
- [ ] เทียบ profile กับ moph-iot-data-hub
