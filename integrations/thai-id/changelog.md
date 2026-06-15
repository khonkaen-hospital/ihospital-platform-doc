# Changelog — ThaID (Digital ID — กรมการปกครอง)

Revision history จากต้นฉบับ `source/ThaID_RP_API_1.0.1.pdf` (ประวัติการแก้ไขเอกสาร)
เวอร์ชันล่าสุดที่เก็บไว้: **1.0.1** (25/09/2023)

| รุ่นเอกสาร | วันที่ | รายละเอียด |
|---|---|---|
| 1.0.1 | 2023-09-25 | เปลี่ยนชื่อเว็บไซต์จาก idp เป็น digitalid |
| 1.0.0 | 2023-07-13 | เพิ่ม scope |
| 0.9.0 | 2023-03-13 | เปลี่ยนชื่อเป็นแอปพลิเคชัน ThaID |
| 0.8.0 | 2023-01-13 | เปลี่ยน endpoint ของ service oauth2; เปลี่ยนชื่อ scope ให้ตรงมาตรฐาน; เปลี่ยนรูปแบบ scope บางตัว (address, birthdate, gender); เพิ่ม API Consent |
| 0.0.07 | 2021-09-09 | แก้ไข Authentication Request URL |
| 0.0.06 | 2021-06-01 | แก้ไข API Revoke; ยกเลิก API Consent |
| 0.0.05 | 2021-02-09 | เพิ่ม OpenID Connect; แก้ไข API Introspect |
| 0.0.04 | 2020-12-18 | แก้ไขชื่อ parameter oauth2; เพิ่ม API Introspect; **นำ Refresh Token ออก** |
| 0.0.03 | 2020-10-28 | แก้สถาปัตยกรรมการให้บริการผ่าน BORA API; นำ State [Option] ออก |
| 0.0.02 | 2020-09-17 | แก้ไข url ของ Request ทุกข้อ |
| 0.0.01 | 2020-09-17 | จัดทำเอกสารต้นแบบ |

---

## โน้ตของทีม (KKH)

- 2026-06-15 — ถอด spec จาก PDF v1.0.1 ครบ (4 endpoint: auth/token/introspect/revoke) ยังไม่ได้ขอ client_id/secret — ต้องทำหนังสือราชการถึงกรมการปกครอง
- ข้อขัดแย้งในต้นฉบับ: changelog v0.0.04 ระบุ "นำ Refresh Token ออก" แต่ตัวอย่าง Token Response ยังมี `refresh_token` — ต้องยืนยันกับ DOPA
