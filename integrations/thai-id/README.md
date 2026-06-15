---
name: ThaID (Digital ID — กรมการปกครอง)
slug: thai-id
system: กรมการปกครอง (DOPA) — สำนักบริหารการทะเบียน · กระทรวงมหาดไทย
direction: pull              # ดึงข้อมูลยืนยันตัวตนประชาชน (OAuth2/OIDC)
base_url: imauth.bora.dopa.go.th/api/v2/oauth2
auth: OAuth2 Authorization Code + OpenID Connect (client_id/client_secret)
encryption: none (TLS) — id_token ลงนาม (signed JWT) จาก DOPA
data_standard: OAuth2 / OpenID Connect
version: 1.0.1
status: draft
source_doc: source/ThaID_RP_API_1.0.1.pdf
source_updated: 2023-09-25
contact_apikey: ลงทะเบียนที่ digitalid.bora.dopa.go.th + หนังสือราชการถึงกรมการปกครอง · โทร 0-2791-7522, 0-2791-7523-5 · d.dopaid@gmail.com
---

# ThaID (Digital ID — กรมการปกครอง)

พิสูจน์และยืนยันตัวตนประชาชนด้วยแอป **ThaID** ผ่าน Identity Provider (IdP) ของกรมการปกครอง — โรงพยาบาลในฐานะ **Relying Party (RP)** ใช้ OAuth2 Authorization Code + OpenID Connect ดึงข้อมูลบัตรประชาชน (pid, ชื่อ-สกุล, ที่อยู่ ฯลฯ) หลังผู้ใช้ยินยอม เป็นรากของ identity สำหรับ "บัตรประชาชนใบเดียว"

> **สถานะ: draft** — ถอด spec จากต้นฉบับครบแล้ว แต่ยังไม่ได้ขอ `client_id`/`client_secret` (ต้องทำหนังสือราชการถึงกรมการปกครอง)
> **เจ้าของคือ DOPA (กระทรวงมหาดไทย) ไม่ใช่ MOPH** — ช่องทางขอใช้งานต่างจาก integration อื่นใน repo

- **spec เต็ม:** [`spec.md`](spec.md)
- **ต้นฉบับ:** [`source/ThaID_RP_API_1.0.1.pdf`](source/ThaID_RP_API_1.0.1.pdf) (18 หน้า, v1.0.1, 25/09/2023)
- **changelog:** [`changelog.md`](changelog.md)

## ภาพรวม (Overview)

มาตรฐาน OAuth2 (Authorization Code) + OpenID Connect — 4 endpoint:

| # | API | Method | Endpoint | หน้าที่ |
|---|---|---|---|---|
| 1 | Authentication | GET | `/oauth2/auth/` | ขอ authorization code (redirect ผู้ใช้ไปยืนยันตัวตน) |
| 2 | Token | POST | `/oauth2/token/` | แลก code เป็น access_token + ข้อมูลผู้ใช้ |
| 3 | Introspect | POST | `/oauth2/introspect/` | ตรวจสอบสถานะ/ความถูกต้องของ token |
| 4 | Revoke | POST | `/oauth2/revoke/` | ยกเลิก token |

- **Base URL:** `https://imauth.bora.dopa.go.th/api/v2/oauth2`
- **OIDC config:** `https://imauth.bora.dopa.go.th/.well-known/openid-configuration`

## Authentication

- **Authorization Code flow:** RP redirect ผู้ใช้ไป `/oauth2/auth/` → ผู้ใช้ยืนยันตัวตน+ยินยอมในแอป ThaID → DOPA ส่ง `code` กลับมาที่ `redirect_uri`
- **Token request** ใช้ HTTP Basic: `Authorization: Basic base64(client_id:client_secret)`, `grant_type=authorization_code`
- `access_token` อายุ **15 นาที**, `token_type=Bearer`
- ขอ `client_id`/`client_secret` + `redirect_uri` โดยลงทะเบียนหน่วยงานที่ `digitalid.bora.dopa.go.th` แล้วส่งหนังสือราชการลงนามผู้มีอำนาจถึงกรมการปกครอง (อนุมัติโดยอธิบดีฯ) — เพิ่มผู้พัฒนาได้ไม่เกิน 10 คน

## Scope (ข้อมูลที่ขอได้)

`pid` · `name` · `name_en` · `birthdate` (YYYY-MM-DD ค.ศ.) · `address` · `given_name` · `middle_name` · `family_name` · `given_name_en` · `middle_name_en` · `family_name_en` · `gender` · `smartcard_code` (เลขใต้รูป) · `title` · `title_en` · `ial` (ระดับความเข้มข้นการพิสูจน์ตัวตน) · `date_of_issuance` · `date_of_expiry` · `openid`

หลาย scope คั่นด้วยช่องว่าง (หรือ `%20` เมื่อ url-encoded)

## ข้อควรระวัง / Gotchas

- **Response token มี 2 รูปแบบตาม scope:**
  - **ไม่มี `openid`** → คืนค่า scope แบบ flat fields ใน body เลย (เช่น `"pid": "..."`, `"name": "..."`)
  - **มี `openid`** → คืน `id_token` (signed JWT ตามมาตรฐาน OpenID Connect) แทน ต้อง verify เองด้วย public key จาก `.well-known/openid-configuration`
- **`expire_in` เป็น Unix timestamp (วินาที) ไม่ใช่ระยะเวลา** — ชื่อ field ชวนเข้าใจผิด (ทั้งสะกดผิดจาก `expires_in` ด้วย); เป็นเวลาหมดอายุสัมบูรณ์
- **`refresh_token` ขัดแย้งในเอกสาร:** changelog ระบุ "นำ Refresh Token ออก" (v0.0.04) แต่ตัวอย่าง Token Response ยังโชว์ `refresh_token` อยู่ — อย่าพึ่ง refresh token จนกว่าจะยืนยันกับ DOPA
- **Introspect/Revoke** ส่ง body เป็น `token=Bearer <token>` (มีคำว่า `Bearer` นำหน้าใน body) + header Basic auth
- ทุก parameter บังคับ ยกเว้นที่ระบุ `[optional]`; Content-Type ทุก request เป็น `application/x-www-form-urlencoded`
- การลงทะเบียนใช้เวลานาน (ต้องมีหนังสือราชการ + อนุมัติระดับอธิบดี) — เผื่อเวลาในแผน
