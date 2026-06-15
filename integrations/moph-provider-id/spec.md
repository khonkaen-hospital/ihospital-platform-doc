# MOPH Provider ID / Health ID — API Specification (เต็ม)

ถอดจากต้นฉบับ `source/Provider_ID_OAuth_Health_ID_2024-07.docx` — "คู่มือการเชื่อมต่อระบบ Provider ID ด้วย OAuth ของ Health ID" (1 กรกฎาคม 2567 / 2024-07-01)
อ่านสรุป + ข้อควรระวังก่อนที่ [`README.md`](README.md)

- **Auth:** OAuth2 Authorization Code (Health ID) → Provider ID service token
- **มาตรฐานข้อมูล:** OAuth2 / JSON · access_token เป็น signed JWT (verify ด้วย public-key API)

## Base URL

| ระบบ | UAT (ทดสอบ) | PRD (ใช้งานจริง) |
|---|---|---|
| Health ID | `https://uat-moph.id.th` | `https://moph.id.th` |
| Provider ID | `https://uat-provider.id.th` | `https://provider.id.th` |

## ภาพรวม API

| # | ส่วน | API | Method | Endpoint |
|---|---|---|---|---|
| 1 | Health ID | Authentication | GET | `{HealthID-URL}/oauth/redirect` |
| 2 | Health ID | Token | POST | `{HealthID-URL}/api/v1/token` |
| 3 | Health ID | Public Key | GET | `{HealthID-URL}/api/v1/oauth/public-key` |
| 4 | Provider ID | Service Token | POST | `{Provider-URL}/api/v1/services/token` |
| 5 | Provider ID | Profile | GET | `{Provider-URL}/api/v1/services/profile` |
| 6 | Provider ID | Public Key | POST | `{Provider-URL}/api/v1/services/public-key` |

---

# ส่วนที่ 1 — Health ID

## API 1 — Authentication (ขอ authorization code)

RP redirect ผู้ใช้ไปหน้า login ของ Health ID เพื่อรับ `code`

- **Method:** `GET`
- **Endpoint:** `{HealthID-URL}/oauth/redirect`

### Request Params

| Parameter | Required | Type | Description |
|---|:--:|---|---|
| `client_id` | Y | string | client id ที่ได้รับหลังลงทะเบียนกับ Health ID |
| `redirect_uri` | Y | string | redirect uri ที่ลงทะเบียนกับ Health ID |
| `response_type` | Y | string | ระบุ `code` |
| `state` | N | string | random string ตรวจสอบความสัมพันธ์ request↔response |

```
GET {HealthID-URL}/oauth/redirect?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code
```

login สำเร็จ → redirect กลับ `redirect_uri` พร้อม `code` ใน query parameter

---

## API 2 — Token (แลก code เป็น access_token)

- **Method:** `POST`
- **Endpoint:** `{HealthID-URL}/api/v1/token`
- **Header:** `Content-type: application/x-www-form-urlencoded`

### Request Body

| Parameter | Required | Type | Description |
|---|:--:|---|---|
| `grant_type` | Y | string | ระบุ `authorization_code` |
| `code` | Y | string | code จาก redirect url หลัง login |
| `redirect_uri` | Y | string | ค่าเดียวกับใน authentication request |
| `client_id` | Y | string | client id จาก Health ID |
| `client_secret` | Y | string | client secret จาก Health ID |

### Response (`application/json`)

| Parameter | Type | Description |
|---|---|---|
| `token_type` | string | ประเภทของ token (`Bearer`) |
| `expires_in` | int | เวลาหมดอายุ (วินาที) |
| `access_token` | string | token ยืนยันตัวตน |
| `expiration_date` | string | วันเวลาหมดอายุ |
| `account_id` | string | Identities Number (ไม่ซ้ำต่อคน) |

```json
200 OK
{
  "status": "success",
  "data": {
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGci….",
    "token_type": "Bearer",
    "expires_in": 31535998,
    "account_id": "165902799049006"
  },
  "message": "You logged in successfully"
}
```

### Error code

| Code | Message | Description |
|---|---|---|
| 401 | Credential is required | จำเป็นต้องใส่ข้อมูล |
| 422 | Access grant has denied | สิทธิ์การเข้าถึงถูกปฏิเสธ |
| 422 | Code is invalid | โค้ดไม่ถูกต้อง |
| 422 | Redirect uri is invalid | Redirect uri ไม่ตรงกัน |
| 422 | Code and Client ID not match. | โค้ดกับ client id ไม่ตรง |
| 422 | Code has been expired | โค้ดหมดอายุ |
| 500 | Server error | เซิร์ฟเวอร์มีปัญหา |

---

## API 3 — Public Key (Health ID)

ใช้ verify access_token (JWT)

- **Method:** `GET`
- **Endpoint:** `{HealthID-URL}/api/v1/oauth/public-key`

### Request Header

| Key | Required | Value | Description |
|---|:--:|---|---|
| `Content-type` | | `application/json` | |
| `client-id` | Y | string | client id จาก Health ID |
| `secret-key` | Y | string | client secret จาก Health ID |

### Response (`plain/text`)

```
200 OK
-----BEGIN PUBLIC KEY-----
XXXXXXXX...
-----END PUBLIC KEY-----
```

### Error code

| Code | Message | message_th |
|---|---|---|
| 422 | Access grant has denied. | Client Id, Secret Key ไม่ถูกต้อง |

---

# ส่วนที่ 2 — Provider ID

> นำ Health ID access_token มาตรวจสอบสถานะการมี Provider ID — มี → `200 OK` + Provider token · ไม่มี → `400 Bad Request`

## API 4 — Service Token (ขอ Provider access_token)

- **Method:** `POST`
- **Endpoint:** `{Provider-URL}/api/v1/services/token`

### Request Body (JSON)

| Parameter | Required | Type | Description |
|---|:--:|---|---|
| `client_id` | Y | string | Client-ID จากระบบ Provider ID |
| `secret_key` | Y | string | Secret-Key จากระบบ Provider ID |
| `token_by` | Y | string | ระบุ `Health ID` |
| `token` | Y | string | access_token จากการ login Health ID |

### Response (`application/json`)

| Parameter | Type | Description |
|---|---|---|
| `token_type` | string | ประเภทของ token |
| `expires_in` | int | เวลาหมดอายุ (วินาที) |
| `access_token` | string | token ยืนยันตัวตน |
| `expiration_date` | string | วันเวลาหมดอายุ |
| `account_id` | string | ไอดีผู้ใช้งาน |
| `result` | string | ผลลัพธ์การเรียก API |
| `username` | string | username ผู้ใช้งาน |
| `login_by` | string | วิธีที่ได้รับ access_token |

```json
200 OK
{
  "status": 200,
  "message": "OK",
  "data": {
    "token_type": "Bearer",
    "expires_in": 86400,
    "access_token": "eyJ0eXAiOiJKV1Qi...",
    "expiration_date": "2023-12-07 19:26:01",
    "account_id": "2506xxxxx84",
    "result": "Success",
    "username": "saxxxxxxth",
    "login_by": "access_token_health_id"
  }
}
```

### Error code

| Code | Message | message_th |
|---|---|---|
| 400 | This user has not provider id | ไม่พบข้อมูล provider id |
| 400 | The requested parameter can not used. | ไม่ได้ระบุ token_by, token |
| 401 | Authentication is required to access this resource | ไม่ได้ระบุ/ไม่พบ client id, secret key |
| 401 | Authentication is required to access this resource | ไม่ได้ระบุ token_by เป็น "Health ID" |
| 500 | Internal Server Error | เซิร์ฟเวอร์มีปัญหา |

---

## API 5 — Profile (ข้อมูลส่วนบุคคล + การทำงาน)

- **Method:** `GET`
- **Endpoint:** `{Provider-URL}/api/v1/services/profile`

### Request Header

```
Content-type: application/json
Authorization: Bearer {{ access_token จาก API 4 }}
client-id: Client-ID จากระบบ Provider ID
secret-key: Secret-Key จากระบบ Provider ID
```

### Request Params (optional)

| Parameter | Required | Type | Description |
|---|:--:|---|---|
| `moph_center_token` | N | string | ระบุ `1` เพื่อดึง token จาก Moph Account Center |
| `moph_idp_permission` | N | string | ระบุ `1` เพื่อดึง `is_hr_admin`, `is_director` จาก Moph IDP |
| `position_type` | N | string | ระบุ `1` เพื่อดึง `position_type` |

### Response (`application/json`) — field หลัก

| Parameter | Type | Description |
|---|---|---|
| `account_id` | string | Identities Number (ไม่ซ้ำต่อคน) |
| `hash_cid` | string | เลขบัตรประชาชน hash ด้วย SHA256 |
| `provider_id` | string | เลข Provider id |
| `title_th` / `title_en` | string | คำนำหน้าชื่อ ไทย/อังกฤษ |
| `special_title_th` / `special_title_en` | string | คำนำหน้าทางการแพทย์ ไทย/อังกฤษ |
| `name_th` / `name_eng` | string | ชื่อ-นามสกุล ไทย/อังกฤษ |
| `firstname_th` / `lastname_th` | string | ชื่อ/นามสกุล ไทย |
| `firstname_en` / `lastname_en` | string | ชื่อ/นามสกุล อังกฤษ |
| `created_at` | string | วันที่สร้างข้อมูล |
| `organization[]` | array | สังกัดการทำงาน (ได้หลายแห่ง) — ดู field ย่อยด้านล่าง |

**`organization[]` (แต่ละสังกัด)**

| Parameter | Type | Description |
|---|---|---|
| `business_id` | string | เลขรหัสองค์กร |
| `position` | string | ตำแหน่ง |
| `hcode` | string | รหัสโรงพยาบาล |
| `hname_th` / `hname_eng` | string | ชื่อองค์กร ไทย/อังกฤษ |
| `tax_id` | string | เลขเสียภาษี |
| `license_expired_date` | string | วันหมดอายุใบประกอบวิชาชีพ |
| `license_id_verify` | bool | `true` = ผ่านตรวจสอบกับสภาวิชาชีพแล้ว |
| `expertise` | string | วิชาชีพเฉพาะ |
| `ref_code` | string | ref_code จาก Station |
| `moph_access_token_idp` | string | MOPH-JWT |
| `moph_access_token_idp_fdh` | string | MOPH-JWT (fdh) — ขึ้นกับสิทธิ์ |
| `moph_access_token_idp_pcu` | string | MOPH-JWT (pcu) — ขึ้นกับสิทธิ์ |
| `is_hr_admin` | string | สิทธิจัดการหน้า admin |
| `is_director` | string | (ผู้อำนวยการ) |
| `position_type` | string | ตำแหน่ง |
| `address.{address,moo,building,soi,street,province,district,sub_district,zip_code}` | string | ที่อยู่องค์กร |

```json
200 OK
{
  "status": 200,
  "message": "OK",
  "data": {
    "account_id": "544xxxxxxxx5794",
    "hash_cid": "7a5635c12063210ec4cb9ea689709541a0d474890e38813e78c566e09f8f6aa7",
    "provider_id": "0111111111X21",
    "special_title_th": "นายแพทย์",
    "name_th": "หมอพร้อม สงบสุข",
    "name_eng": "Mophrom Eng",
    "firstname_th": "หมอพร้อม",
    "lastname_th": "สงบสุข",
    "organization": [
      {
        "business_id": "987654321098765",
        "position": "แพทย์",
        "license_id": "12345",
        "hcode": "XXXXX",
        "hname_th": "สำนักดิจิทัลฮา",
        "tax_id": "0123456789123",
        "license_id_verify": true,
        "expertise": "สูติศาสตร์และนรีเวชวิทยา",
        "expertise_id": "113",
        "is_private_provider": false,
        "address": {
          "address": "อาคารหมอพร้อม",
          "province": "นนทบุรี",
          "district": "เมืองนนทบุรี",
          "sub_district": "ตลาดขวัญ",
          "zip_code": "11000"
        },
        "is_hr_admin": true,
        "is_director": true,
        "moph_access_token_idp": "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9...",
        "moph_access_token_idp_fdh": "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9...",
        "moph_access_token_idp_pcu": null,
        "position_type": "แพทย์"
      }
    ]
  }
}
```

### Error code

| Code | Message | Description |
|---|---|---|
| 400 | The requested parameter can not used. | ไม่ได้ระบุ access_token, Client-ID หรือ Secret-Key |
| 401 | access_token is invalid | access_token ไม่ถูกต้อง |
| 401 | Authentication is required to access this resource | ไม่พบ/ไม่ตรง client_id secret_key |
| 404 | This user has no provider id | ไม่พบข้อมูล provider id |
| 404 | The requested resource was not found | ข้อมูลไม่สมบูรณ์ |
| 500 | Internal Server Error | เซิร์ฟเวอร์มีปัญหา |
| 503 | The service is temporarily unavailable. Please try again later. | ระบบที่เชื่อมต่อมีปัญหา |

---

## API 6 — Public Key (Provider ID)

- **Method:** `POST`
- **Endpoint:** `{Provider-URL}/api/v1/services/public-key`

### Request Body (JSON)

| Parameter | Required | Type | Description |
|---|:--:|---|---|
| `client_id` | Y | string | Client-ID จากระบบ Provider ID |
| `secret_key` | Y | string | Secret-Key จากระบบ Provider ID |

### Response (`plain/text`)

```
200 OK
-----BEGIN PUBLIC KEY-----
XXXXXXXX...
-----END PUBLIC KEY-----
```

### Error code

| Code | Message | message_th |
|---|---|---|
| 401 | Authentication is required to access this resource | Client id, Secret key ไม่ถูกต้อง |
| 500 | Internal Server Error | เซิร์ฟเวอร์มีปัญหา |
