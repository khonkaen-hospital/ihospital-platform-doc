# e-Referral (ระบบส่งต่อผู้ป่วย) — API Specification (เต็ม)

> **ยังเป็นโครง (draft)** — ต้องนำเอกสารต้นฉบับมาวางใน `source/` แล้วถอดเนื้อหาลงที่นี่
> อ่านสรุป + แหล่งอ้างอิงก่อนที่ [`README.md`](README.md)

- **Base URL:** TBD
- **Auth:** TBD
- **มาตรฐานข้อมูล:** มาตรฐานข้อมูลส่งต่อ + HIS API

---

## ภาพรวม API

| # | API | Method | Endpoint | ทิศทาง |
|---|---|---|---|---|
| 1 | _(รอถอดจากต้นฉบับ — refer out / refer in)_ | | | push + pull |

---

## TODO ก่อนถอด spec

- [ ] ยืนยันระบบส่งต่อที่ใช้จริงในเขตของ KKH (Thai Refer / e-Referral สปสช.)
- [ ] ดึงรายการ field มาตรฐาน + API doc วางใน `source/`
- [ ] ถอด endpoint + payload
