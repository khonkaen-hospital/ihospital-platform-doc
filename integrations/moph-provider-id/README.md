---
name: MOPH Provider ID / Health ID
slug: moph-provider-id
system: กระทรวงสาธารณสุข — Health ID / Provider ID (MOPH Account Center · สำนักสุขภาพดิจิทัล BDH)
direction: pull              # login OAuth + ดึง profile/token; เป็นชั้น auth กลางของระบบอื่น
base_url: moph.id.th (Health ID) · provider.id.th (Provider ID)
auth: OAuth2 Authorization Code (Health ID) → Provider ID service token
encryption: none (TLS) — access_token เป็น signed JWT (verify ด้วย public-key API)
data_standard: OAuth2 / JSON
version: 2024-07-01 (คู่มือ 1 ก.ค. 2567)
status: draft
source_doc: source/Provider_ID_OAuth_Health_ID_2024-07.docx
source_updated: 2024-07-01
contact_apikey: provider.id@moph.go.th · โทร 02-590-2076-77
---

# MOPH Provider ID / Health ID

ชั้น **authentication กลาง** ของกระทรวงสาธารณสุข — ผู้ใช้ login ด้วย **Health ID** (OAuth2 Authorization Code) แล้วเอา access_token ไปแลก **Provider ID** token เพื่อดึงข้อมูลบุคลากร (ส่วนตัว + สังกัด) เป็น prerequisite ของ FDH/PHR ฯลฯ

> **สถานะ: draft** — ถอด spec ครบแล้ว (6 endpoint) ยังไม่ได้ขอ `client_id`/`secret_key` (UAT/PRD)
> **ทำก่อนตัวอื่น** — profile ที่ได้มี `moph_access_token_idp` / `_fdh` / `_pcu` (MOPH-JWT) สำหรับเรียกระบบปลายทาง

- **spec เต็ม:** [`spec.md`](spec.md)
- **ต้นฉบับ:** [`source/Provider_ID_OAuth_Health_ID_2024-07.docx`](source/Provider_ID_OAuth_Health_ID_2024-07.docx) (1 ก.ค. 2567)
- **changelog:** [`changelog.md`](changelog.md)

## ภาพรวม (Overview)

แบ่ง 2 ส่วน · 6 endpoint:

| # | ส่วน | API | Method | Endpoint |
|---|---|---|---|---|
| 1 | Health ID | Authentication (ขอ code) | GET | `{HealthID-URL}/oauth/redirect` |
| 2 | Health ID | Token (แลก code → access_token) | POST | `{HealthID-URL}/api/v1/token` |
| 3 | Health ID | Public Key (verify token) | GET | `{HealthID-URL}/api/v1/oauth/public-key` |
| 4 | Provider ID | ขอ Provider token (จาก Health ID token) | POST | `{Provider-URL}/api/v1/services/token` |
| 5 | Provider ID | ขอข้อมูล Provider (profile + สังกัด) | GET | `{Provider-URL}/api/v1/services/profile` |
| 6 | Provider ID | Public Key (verify token) | POST | `{Provider-URL}/api/v1/services/public-key` |

**Base URL**

| ระบบ | UAT | PRD |
|---|---|---|
| Health ID | `https://uat-moph.id.th` | `https://moph.id.th` |
| Provider ID | `https://uat-provider.id.th` | `https://provider.id.th` |

## Authentication (flow)

1. ผู้ใช้กดปุ่ม Login → redirect ไป `{HealthID-URL}/oauth/redirect?client_id=&redirect_uri=&response_type=code`
2. login สำเร็จ → Health ID redirect กลับ `redirect_uri` พร้อม `code`
3. Backend แลก code: `POST {HealthID-URL}/api/v1/token` → ได้ **Health ID access_token**
4. เอา Health ID token ไปขอ Provider token: `POST {Provider-URL}/api/v1/services/token` (`token_by="Health ID"`)
   - มี Provider ID → `200 OK` + Provider access_token · ไม่มี → `400 Bad Request`
5. ดึง profile: `GET {Provider-URL}/api/v1/services/profile` (Bearer + `client-id`/`secret-key`)

## ข้อควรระวัง / Gotchas

- **2 ระบบซ้อนกัน** — Health ID token ใช้กับ Provider ID ไม่ได้ตรง ๆ ต้องแลกเป็น Provider token ก่อน
- **ไม่มี Provider ID = `400`** ที่ขั้น token (API 4) ไม่ใช่ error ระบบ — ต้อง handle เป็นเคส "ผู้ใช้ไม่ใช่ provider"
- **อายุ token ต่างกันมาก:** Health ID `expires_in: 31535998` (~365 วัน) · Provider ID `expires_in: 86400` (1 วัน)
- **`organization` เป็น array** (สังกัดได้หลายที่) — ตาราง param เขียนเป็น `organization.*` flat แต่ JSON จริงเป็น list
- **JSON จริงมี field มากกว่าตาราง param** เช่น `affiliation`, `license_id`, `code9`, `hcode9`, `level`, `expertise_id`, `is_private_provider`, `moph_station_ref_code` — อย่ายึดเฉพาะตาราง
- **MOPH-JWT ต้องร้องขอ:** `moph_access_token_idp` / `_fdh` / `_pcu` จะได้ก็ต่อเมื่อส่ง query `moph_center_token=1` และ/หรือ `moph_idp_permission=1` (และขึ้นกับสิทธิ์) — token เหล่านี้คือกุญแจไปต่อ FDH/PCU
- **ชื่อ key ของ credential ไม่สม่ำเสมอ:** API token (4) ใช้ body `client_id`/`secret_key`; profile/public-key ใช้ **header** `client-id`/`secret-key` (ขีดกลาง); Health ID token ใช้ `client_secret`
- **public-key 2 ระบบเรียกต่างวิธี:** Health ID = `GET` + header · Provider ID = `POST` + body
