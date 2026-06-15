# MOPH Financial Data Hub (FDH) — API Specification (เต็ม)

> **ยังเป็นโครง (draft)** — ต้องนำเอกสารต้นฉบับมาวางใน `source/` แล้วถอดเนื้อหาลงที่นี่
> อ่านสรุป + แหล่งอ้างอิงก่อนที่ [`README.md`](README.md)

- **Base URL:** `fdh.moph.go.th`
- **Auth:** OAuth via Provider ID (TBD)
- **มาตรฐานข้อมูล:** financial / claims (เชื่อม NHSO eClaim)

---

## ภาพรวม API

| # | API | Method | Endpoint | ทิศทาง |
|---|---|---|---|---|
| 1 | _(รอถอดจากต้นฉบับ — ส่งข้อมูลการเงิน/เบิกจ่าย)_ | | | push |

---

## TODO ก่อนถอด spec

- [ ] ดึงคู่มือ/spec MOPH FDH วางใน `source/`
- [ ] ยืนยัน auth flow + ความสัมพันธ์กับ NHSO eClaim
- [ ] รูปแบบข้อมูล (FHIR financial หรือ format เฉพาะ)
- [ ] ถอด endpoint + payload + ตัวอย่าง
