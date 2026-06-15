# ThaID (Digital ID — กรมการปกครอง) — API Specification (เต็ม)

ถอดจากต้นฉบับ `source/ThaID_RP_API_1.0.1.pdf` — "API ลงทะเบียนสำหรับผู้ให้บริการ (Relying Party: RP)" รุ่นเอกสาร 1.0.1 (25 กันยายน 2566 / 2023-09-25)
อ่านสรุป + ข้อควรระวังก่อนที่ [`README.md`](README.md)

- **Base URL:** `https://imauth.bora.dopa.go.th/api/v2/oauth2`
- **Auth:** OAuth2 Authorization Code + OpenID Connect · Token endpoint ใช้ `Authorization: Basic base64(client_id:client_secret)`
- **มาตรฐานข้อมูล:** OAuth2 / OpenID Connect
- **OIDC discovery:** `https://imauth.bora.dopa.go.th/.well-known/openid-configuration`
- **ลงทะเบียน RP:** `https://digitalid.bora.dopa.go.th`
- **Content-Type:** ทุก request เป็น `application/x-www-form-urlencoded`

---

## ภาพรวม API

| # | API | Method | Endpoint | ทิศทาง |
|---|---|---|---|---|
| 1 | Authentication (authorize) | GET | `/oauth2/auth/` | pull |
| 2 | Token | POST | `/oauth2/token/` | pull |
| 3 | Token Introspect | POST | `/oauth2/introspect/` | pull |
| 4 | Token Revocation | POST | `/oauth2/revoke/` | pull |

---

# API 1 — Authentication

Web/Mobile Application ของ RP ส่ง authentication request เป็น HTTPS GET ไปยัง authorize endpoint เพื่อให้ผู้ใช้ยืนยันตัวตน+ยินยอม แล้วรับ `authorization code`

- **Method:** `GET`
- **Endpoint:** `{{base_url}}/auth/`

## Parameters (Authentication Request)

| Parameter | Required | Description |
|---|:--:|---|
| `response_type` | ✓ | ระบุ `code` (authorization code flow) |
| `client_id` | ✓ | client identifier ที่ DOPA ออกให้ RP ที่ลงทะเบียนแล้ว |
| `redirect_uri` | ✓ | URI ที่ RP ลงทะเบียนไว้ ใช้รับ authorization code |
| `scope` | ✓ | ชุดข้อมูลที่ขอ (ดูรายการด้านล่าง) หลายค่าคั่นด้วยช่องว่าง / `%20` |
| `state` | ✓ | random string ใช้ตรวจสอบความสัมพันธ์ request↔response |

### ค่า scope ที่ขอได้

| scope | ข้อมูล |
|---|---|
| `pid` | หมายเลขประจำตัวประชาชน 13 หลัก |
| `name` | ชื่อ-นามสกุล ภาษาไทย |
| `name_en` | ชื่อ-นามสกุล ภาษาอังกฤษ |
| `birthdate` | วัน เดือน ปี ค.ศ. เกิด (เช่น `1989-12-28`) |
| `address` | ที่อยู่ตามหน้าบัตรประชาชน |
| `given_name` | ชื่อ ภาษาไทย |
| `middle_name` | ชื่อกลาง ภาษาไทย |
| `family_name` | นามสกุล ภาษาไทย |
| `given_name_en` | ชื่อ ภาษาอังกฤษ |
| `middle_name_en` | ชื่อกลาง ภาษาอังกฤษ |
| `family_name_en` | นามสกุล ภาษาอังกฤษ |
| `gender` | เพศ (เช่น `male`) |
| `smartcard_code` | เลขใต้รูป |
| `title` | คำนำหน้านามภาษาไทย |
| `title_en` | คำนำหน้านามภาษาอังกฤษ |
| `ial` | ระดับความเข้มข้นในการพิสูจน์ตัวตน (Identity Assurance Level) |
| `date_of_issuance` | วันที่ออกบัตร |
| `date_of_expiry` | วันที่บัตรหมดอายุ |
| `openid` | คืน `id_token` (OpenID Connect) ที่บรรจุข้อมูลที่ร้องขอ |

## ตัวอย่าง request

```
GET https://imauth.bora.dopa.go.th/api/v2/oauth2/auth/?response_type=code
  &client_id={{clientIdFromDOPA}}
  &redirect_uri=https://rp.example.org/api/callback
  &scope=pid%20name%20birthdate%20openid
  &state=af0ifjsldkj
Header: Content-type: application/x-www-form-urlencoded
```

## Authentication Response (สำเร็จ)

DOPA ส่ง HTTPS 302 redirect กลับมาที่ `redirect_uri`

| Parameter | Description |
|---|---|
| `code` | authorization code ใช้แลก access token |
| `state` | ค่าเดียวกับ state ใน request |

```
HTTP 302 Found
https://rp.example.org/api/callback?code=nnqtYcoik7cjtHQYyn3Af8uk4LG3rYYh&state=af0ifjsldkj
```

## Authentication Error Response

| Parameter | Description |
|---|---|
| `error` | error code (ดูหัวข้อ Error codes) |
| `error_description` | คำอธิบาย error เป็น text |
| `error_uri` | URI ข้อมูลเพิ่มเติม (อาจเป็น webpage) |
| `state` | ค่าเดียวกับ state ใน request |

```
HTTP 302 Found
https://rp.example.org/api/callback?error=invalid_request&error_description=Unsupported%20response_type&state=af0ifjsldkj
```

---

# API 2 — Token

ใช้ `authorization code` แลกเป็น access token + ข้อมูลยืนยันตัวตน

- **Method:** `POST`
- **Endpoint:** `{{base_url}}/token/`

## Parameters (Access Token Request)

| Parameter | Required | Description |
|---|:--:|---|
| `authorization` (header) | ✓ | `Basic ` + `base64(client_id:client_secret)` |
| `grant_type` | ✓ | `authorization_code` |
| `code` | ✓ | authorization code ที่ได้จาก API 1 |
| `redirect_uri` | ✓ | ค่าเดียวกับใน authentication request |

## ตัวอย่าง request

```
POST https://imauth.bora.dopa.go.th/api/v2/oauth2/token/
Header:
{
  "Content-type": "application/x-www-form-urlencoded",
  "Authorization": "Basic <base64(client_id:client_secret)>"
}
Body:
grant_type=authorization_code
code=<code>
redirect_uri=<redirect_uri>
```

## Token Response

| Parameter | Description |
|---|---|
| `access_token` | String อายุ 15 นาที |
| `token_type` | `Bearer` |
| `expire_in` | เวลาที่ access token หมดอายุ — **Unix timestamp (วินาที)** (ดู Gotchas) |
| `scope` | scope ที่ได้รับ |
| `id_token` | *(option)* คืนเฉพาะเมื่อ `scope=openid` — JWT ตามมาตรฐาน OpenID Connect |
| `<scope value>` | *(เฉพาะกรณีไม่มี openid)* แต่ละ scope คืนค่าตรง ๆ เป็น field |

### กรณีไม่กำหนด scope `openid`

```json
HTTP 200 OK
{
  "expire_in": 1612857374,
  "access_token": "access_token",
  "refresh_token": "refresh_token",
  "token_type": "Bearer",
  "scope": "pid name",
  "pid": " pid ",
  "name": " name "
}
```

### กรณีกำหนด scope `openid`

```json
HTTP 200 OK
{
  "expire_in": 1612857374,
  "access_token": "access_token",
  "refresh_token": "refresh_token",
  "token_type": "Bearer",
  "scope": "pid name openid",
  "id_token": "id_token jwt"
}
```

> หมายเหตุ: ตัวอย่างต้นฉบับยังมี `refresh_token` แต่ changelog ระบุว่านำ refresh token ออกแล้ว — ดู Gotchas ใน README

## ID Token (เมื่อ scope=openid)

`id_token` เป็น JWT ลงนาม (signed) จากกรมการปกครอง เข้ารหัส Base64 — verify ได้ตาม `.well-known/openid-configuration`

| Claim | Description |
|---|---|
| `at_hash` | Access Token hash value |
| `aud` | App ที่ใช้งานได้ |
| `exp` | วัน เวลา หมดอายุ |
| `iat` | วัน เวลา ที่ออก token |
| `iss` | ผู้ออก token |
| `sub` | Subject Identifier |
| `<scope value>` | ค่าของแต่ละ scope (เช่น `pid`, `name`, `birthdate`) |

---

# API 3 — Token Introspect

ตรวจสอบสถานะ/ความถูกต้องของ token

- **Method:** `POST`
- **Endpoint:** `{{base_url}}/introspect/`

## Parameters

| Parameter | Required | Description |
|---|:--:|---|
| `authorization` (header) | ✓ | `Basic <base64(client_id:client_secret)>` |
| `token` (body) | ✓ | token อายุ 15 นาที — ส่งเป็น `token=Bearer <token>` |

## ตัวอย่าง request

```
POST https://imauth.bora.dopa.go.th/api/v2/oauth2/introspect/
Header:
{
  "Content-type": "application/x-www-form-urlencoded",
  "Authorization": "Basic <authorization>"
}
Body: token=Bearer <token>
```

## ตัวอย่าง response

```json
HTTP 200 OK
{
  "active": true,
  "sub": "1639800072121",
  "scope": "pid name"
}
```

## Error response

```json
HTTP 400 Bad Request
{
  "error": "invalid_request",
  "error_description": "The body is invalid"
}
```

---

# API 4 — Token Revocation

ยกเลิก token

- **Method:** `POST`
- **Endpoint:** `{{base_url}}/revoke/`

## Parameters

| Parameter | Required | Description |
|---|:--:|---|
| `authorization` (header) | ✓ | `Basic <base64(client_id:client_secret)>` |
| `token` (body) | ✓ | token ที่ต้องการยกเลิก — ส่งเป็น `token=Bearer <token>` |

## ตัวอย่าง request

```
POST https://imauth.bora.dopa.go.th/api/v2/oauth2/revoke/
Header:
{
  "Content-type": "application/x-www-form-urlencoded",
  "Authorization": "Basic <authorization>"
}
Body: token=Bearer <token>
```

## ตัวอย่าง response

```json
HTTP 200 OK
{
  "status": "OK",
  "message": "revoked"
}
```

---

# Error codes (หัวข้อ 7 ข้อแนะนำ)

`Status` = HTTP Status Code ที่ระบบตอบกลับ · Response อยู่ในรูปแบบ JSON (บางคำสั่งไม่มีข้อมูลตอบกลับขึ้นกับ Status)

| Code | Error | Description |
|---|---|---|
| 400 | `invalid_request` | The require parameter is missing or invalid |
| 400 | `invalid_scope` | The scope is invalid |
| 400 | `invalid_request` | The redirect or callback url mismatch or invalid |
| 400 | `invalid_request` | Invalid Authorization Code |
| 400 | `unsupported_response_type` | Unsupported response type |
| 400 | `unsupported_grant_type` | Unsupported grant type |
| 400 | `unsupported_token_hint` | Unsupported token hint |
| 400 | `unsupported_token_type` | Unsupported token type |
| 400 | `duplicate_request` | The duplicate request is not allowed |
| 400 | `server_error` | Something went wrong, please try again in the moment |
| 401 | `unauthorized_client` | The client is not authorized |
| 401 | `invalid_client` | Client id not found |
| 401 | `user_denied` | User denied the request (disapproved) |
| 401 | `invalid_refresh_token` | Verify refresh token failed |
| 401 | `invalid_refresh_token` | Invalid refresh token |
| 401 | `invalid_refresh_token` | Cannot refresh access token |
| 401 | `access_denied` | You're not allowed |
| 401 | `access_denied` | You're not allowed as Authorative Source |
| 401 | `access_denied` | You don't have permission to access this service |
| 404 | `not found` | data |

---

# ผู้ติดต่อ

สำนักบริหารการทะเบียน กรมการปกครอง กระทรวงมหาดไทย
โทร 0-2791-7522, 0-2791-7523-5 · email `d.dopaid@gmail.com`
