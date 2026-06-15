# MOPH Provider ID / Health ID — API Specification (เต็ม)

> **ยังเป็นโครง (draft)** — ต้องนำเอกสารต้นฉบับมาวางใน `source/` แล้วถอดเนื้อหาลงที่นี่
> อ่านสรุป + แหล่งอ้างอิงก่อนที่ [`README.md`](README.md)

- **Base URL:** `provider.id.th` / `moph.id.th` / `id.moph.go.th` (TBD ยืนยันตัวจริง)
- **Auth:** OAuth2 — `Authorization: Bearer <token>` + `client-id` + `secret-key`
- **มาตรฐานข้อมูล:** OAuth2 / JSON profile

---

## ภาพรวม API

| # | API | Method | Endpoint | ทิศทาง |
|---|---|---|---|---|
| 1 | Get service profile | GET | `{Provider-URL}/api/v1/services/profile` | pull |
| 2 | _(รอถอดจากต้นฉบับ: authorize / token / authen code / QR)_ | | | |

---

## TODO ก่อนถอด spec

- [ ] ขอ/ดาวน์โหลดคู่มือ Provider ID OAuth วางใน `source/`
- [ ] ขอ `client-id` / `secret-key` จาก provider.id@moph.go.th
- [ ] ถอด OAuth flow (authorize → token → profile), scope ทั้งหมด, authen code / QR
- [ ] ตัวอย่าง request/response จริง
