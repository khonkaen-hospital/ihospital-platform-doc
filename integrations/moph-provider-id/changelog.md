# Changelog — MOPH Provider ID / Health ID

ต้นฉบับ `source/Provider_ID_OAuth_Health_ID_2024-07.docx` — "คู่มือการเชื่อมต่อระบบ Provider ID ด้วย OAuth ของ Health ID"

| Release | Date | รายละเอียด |
|---|---|---|
| คู่มือ | 2024-07-01 | เอกสารคู่มือเชื่อมต่อ Health ID → Provider ID (OAuth2 Authorization Code) |

---

## โน้ตของทีม (KKH)

- 2026-06-15 — สร้าง stub จากการสำรวจ landscape MOPH
- 2026-06-15 — ได้ต้นฉบับ .docx (1 ก.ค. 2567) ถอด spec ครบ 6 endpoint (Health ID auth/token/public-key + Provider ID token/profile/public-key) ยังไม่ได้ขอ client_id/secret_key
- ข้อสำคัญ: profile คืน `moph_access_token_idp_fdh` (MOPH-JWT) ที่ใช้ต่อกับระบบ FDH — เชื่อมกับ integration [moph-fdh]
