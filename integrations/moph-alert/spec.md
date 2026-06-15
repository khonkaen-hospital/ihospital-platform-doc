# MOPH Alert (แจ้งเตือนประชาชน) — API Specification (เต็ม)

> **ยังเป็นโครง (draft)** — มี API doc แล้ว (BDH, 2024-09) ดึงมาวางใน `source/` แล้วถอดได้เลย
> อ่านสรุป + แหล่งอ้างอิงก่อนที่ [`README.md`](README.md)

- **Base URL:** `bdh.moph.go.th`
- **Auth:** OAuth via Provider ID (TBD)
- **มาตรฐานข้อมูล:** JSON (custom)

---

## ภาพรวม API

| # | API | Method | Endpoint | ทิศทาง |
|---|---|---|---|---|
| 1 | _(รอถอดจากต้นฉบับ — push notification ถึงประชาชน)_ | | | push |

---

## TODO ก่อนถอด spec

- [ ] ดาวน์โหลด "API MOPH ALERT หมอพร้อม" (update 30-8-67) วางใน `source/`
- [ ] ถอด endpoint + payload + ประเภทข้อความ (นัด/ผล/survey)
- [ ] ยืนยัน scope/permission
