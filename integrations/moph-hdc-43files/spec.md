# HDC — 43 แฟ้ม (Standard Data Set) — API Specification (เต็ม)

> **ยังเป็นโครง (draft)** — ต้องนำเอกสารต้นฉบับมาวางใน `source/` แล้วถอดเนื้อหาลงที่นี่
> อ่านสรุป + แหล่งอ้างอิงก่อนที่ [`README.md`](README.md)

- **Base URL:** `spd.moph.go.th` / HDC จังหวัด (TBD)
- **Auth:** credential หน่วยบริการ (TBD)
- **มาตรฐานข้อมูล:** โครงสร้าง 43 แฟ้ม + ICD-10-TM / ICD-9-CM

---

## โครงสร้าง 43 แฟ้ม

| # | แฟ้ม | คำอธิบาย |
|---|---|---|
| 1 | _(รอถอดจากต้นฉบับ — PERSON, SERVICE, DIAGNOSIS, DRUG, ฯลฯ)_ | |

---

## TODO ก่อนถอด spec

- [ ] ดึงโครงสร้างมาตรฐาน 43 แฟ้มเวอร์ชันล่าสุด วางใน `source/`
- [ ] ถอดทุกแฟ้ม + field + type + รหัสมาตรฐานที่ใช้
- [ ] วิธี/endpoint การ upload ของ HDC จังหวัด
- [ ] mapping HIS ของเรา → 43 แฟ้ม
