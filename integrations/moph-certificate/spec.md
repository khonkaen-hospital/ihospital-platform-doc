# MOPH Certificate (ใบรับรองแพทย์ดิจิทัล) — API Specification (เต็ม)

> **ยังเป็นโครง (draft)** — ต้องนำเอกสารต้นฉบับมาวางใน `source/` แล้วถอดเนื้อหาลงที่นี่
> อ่านสรุป + แหล่งอ้างอิงก่อนที่ [`README.md`](README.md)

- **Base URL:** `mohpromt.moph.go.th`
- **Auth:** OAuth via Provider ID + digital signature
- **มาตรฐานข้อมูล:** เอกสารลงนามดิจิทัล (TBD)

---

## ภาพรวม API

| # | API | Method | Endpoint | ทิศทาง |
|---|---|---|---|---|
| 1 | _(รอถอดจากต้นฉบับ — ออก/ส่งใบรับรองแพทย์)_ | | | push |

---

## TODO ก่อนถอด spec

- [ ] ทำ moph-provider-id ก่อน
- [ ] ดึง API doc MOPH Certificate วางใน `source/`
- [ ] ถอดกลไก digital signature (cert/key) + endpoint + payload
