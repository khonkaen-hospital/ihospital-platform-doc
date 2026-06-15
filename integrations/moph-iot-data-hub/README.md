---
name: MOPH Health IoT Data Hub
slug: moph-iot-data-hub
system: กระทรวงสาธารณสุข (MOPH)
direction: push + pull          # push 3 APIs (Demographic/Health/Device), pull 1 (Telemedicine)
base_url: moph-iot.moph.go.th
auth: Bearer token (ขอผ่านอีเมล)
encryption: AES-256-GCM (เฉพาะ payload ของ API push)
data_standard: HL7 FHIR (Patient / RelatedPerson / Observation / Device) + LOINC
version: V1.10
status: active
source_doc: source/API_DOC_IoT_Data_Hub_1.10.pdf
source_updated: 2026-03-30
contact_apikey: provider.id@moph.go.th (cc sirinthra@abs.co.th)
---

# MOPH Health IoT Data Hub

API สำหรับเชื่อมโยงข้อมูลสุขภาพจากอุปกรณ์ IoT เข้าสู่ระบบ **MOPH Health IoT Data Hub** ของกระทรวงสาธารณสุข

- **spec เต็ม:** [`spec.md`](spec.md)
- **ต้นฉบับ:** [`source/API_DOC_IoT_Data_Hub_1.10.pdf`](source/API_DOC_IoT_Data_Hub_1.10.pdf) (45 หน้า, V1.10, 30/03/2026)
- **changelog:** [`changelog.md`](changelog.md)
- **โค้ดตัวอย่าง encryption:** [`examples/`](examples/)

## ภาพรวม (Overview)

ระบบรับ-ส่งข้อมูลตามมาตรฐาน **HL7 FHIR** ห่อด้วย `Bundle` (type `collection`)
มี 4 API: 3 ตัวสำหรับ **ส่งข้อมูลเข้า (push)** และ 1 ตัวสำหรับ **ดึงข้อมูลออก (pull)** เพื่อทำ Telemedicine

| # | API | Method | Endpoint | ทิศทาง | FHIR resource |
|---|---|---|---|---|---|
| 1 | Upsert Demographic | POST | `/api/iot-patient` | push | Patient, RelatedPerson |
| 2 | Basic Health | POST | `/api/iot-observation-health` | push | Observation |
| 3 | Device | POST | `/api/iot-device` | push | Device |
| 4 | Telemedicine (ดึงข้อมูล) | GET | `/api/v1/patient-observation` | pull | Observation (flatten) |

- **Base URL:** `moph-iot.moph.go.th` (ต่อ endpoint ด้านบน เป็น `{{base_url}}/api/...`)

## Authentication

- รองรับ **Bearer token เท่านั้น** — header `Authorization: Bearer {{api_token}}`
- ขอ token โดยส่งอีเมลไปที่ **`provider.id@moph.go.th`** (สำเนาถึง `sirinthra@abs.co.th`) พร้อมข้อมูล:
  - ชื่อหน่วยงาน · ชื่อ–นามสกุล · เบอร์โทรผู้ติดต่อหลัก
- เจ้าหน้าที่จะ generate token + encryption key แล้วส่งกลับทางอีเมล

## Encryption (สำคัญมาก)

- **API push (1–3)** ต้องเข้ารหัส payload ด้วย **AES-256-GCM** เท่านั้น — ส่งฟิลด์ `data` เป็น base64 ของ ciphertext+authTag
- key ที่ใช้ผ่าน **SHA-256 derive** เป็น 32 bytes ก่อน, nonce 12 bytes (pad/truncate จากสตริง NONCE)
- auth tag = 16 bytes ต่อท้าย ciphertext แล้ว base64 ทั้งก้อน
- key/nonce จริง MOPH ส่งให้ทางอีเมล — ดูโค้ดอ้างอิงใน [`examples/encryption.nodejs.ts`](examples/encryption.nodejs.ts) และ [`examples/encryption.php`](examples/encryption.php)
- **API pull (4)** เป็น GET ธรรมดา ไม่ encrypt body

## Request/Response wrapper (push 1–3)

Request: `{ "data_count": <n>, "data": "<base64 ของ AES-256-GCM(JSON array)>" }`
JSON หลัง decrypt เป็น array ของ FHIR `Bundle`

Response (snake_case): `status_code`, `status_message`, `data_count`, `data_received`, `data_rejected`, `errors`

## ข้อควรระวัง / Gotchas

- **ชื่อฟิลด์ response ไม่สม่ำเสมอระหว่าง API:** API 1–3 ใช้ **snake_case** (`status_code`, `data_received`) แต่ API 4 ใช้ **camelCase** (`statusCode`, `dataReceived`) — อย่า map ปนกัน
- **address ในตาราง params กับในตัวอย่างไม่ตรงกัน:** ตาราง params ระบุ `subdistrict`/`district`/`province` แต่ตัวอย่าง JSON ที่ decrypt กลับใช้ `district`/`city`/`state` (รูปแบบ FHIR มาตรฐาน) — ต้องยืนยันกับ MOPH ว่าฝั่ง production รับ key ชุดไหน
- **`blood_status` (LOINC 55284-4)** เป็น boolean ที่ **บังคับส่งทุกครั้งที่ส่งค่าน้ำตาลในเลือด (glucose)**: `true` = งดอาหาร, `false` = ไม่งดอาหาร
- **API 2 device.identifier:** ในตาราง params วาง `value`/`reference`/`display` คนละ level — ดูตัวอย่าง JSON จริงใน spec.md ประกอบ
- **API 4 startDate/endDate ต้องมาคู่กันเสมอ** ระบุมาตัวเดียวจะได้ `400 Bad Request`
- **ไฟล์แนบ (เสียง/ภาพ/วิดีโอ/EKG)** ส่งผ่าน `attachment` (url/type/title) คู่กับ LOINC code เฉพาะ (เช่น 11492-6 Heart Sound, 11524-6 EKG)
- ค่า base URL และอีเมลขอ key **เปลี่ยนบ่อย** ในประวัติ revision — ยึดตาม V1.10 ปัจจุบัน ถ้าได้เอกสารใหม่ให้อัปเดต frontmatter + INDEX
