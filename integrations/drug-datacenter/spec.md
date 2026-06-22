# API Drug Center (Drug Datacenter) — API Specification (เต็ม)

ถอดจากต้นฉบับ [`source/API_Drug_Center_v1.0.30.gdoc.md`](source/API_Drug_Center_v1.0.30.gdoc.md) — "API Drug Center" v1.0.30 ของ **ManageAI** (snapshot จาก Google Doc, ดึง 2026-06-22)
อ่านสรุป + ข้อควรระวังก่อนที่ [`README.md`](README.md)

- **ผู้ให้บริการ:** ManageAI (`manageai.co.th`)
- **Auth:** `apiKey` (header) + `moph_access_token_idp` (MOPH-JWT จาก [moph-provider-id](../moph-provider-id/)) — บาง endpoint บังคับ
- **มาตรฐานข้อมูล:** TMT (Thai Medicines Terminology) — รหัส TPU/TP/GPU/GP/VTM + SUBS · ยาแผนไทยใช้ TTMT
- **Envelope:** ทุก response เป็น `{ status, message, data, code }`

## Base URL

| Environment | Base URL |
|---|---|
| UAT (ทดสอบ) | `https://uat-api-healthcare.manageai.co.th/mai/drug-datacenter` |
| PRD (ใช้งานจริง) | `https://api-healthcare.manageai.co.th/mai/drug-datacenter` |

## ภาพรวม API

| # | กลุ่ม | API | Method | Endpoint | ต้องมี moph token |
|---|---|---|---|---|:--:|
| 1 | Drug | Get Drugs (ค้นโครงสร้างยา) | GET | `/api/v1/drugs` | — |
| 2 | Interaction | Contrast (ตรวจ DI ร่วม PHR) | POST | `/api/v1/drug/contrast` | optional |
| 3 | Allergy | Check Drug Allergy | POST | `/api/v1/drug/allergy` | **Y** |
| 4 | Interaction & Allergy | Safety Check (DI + แพ้ยา) | POST | `/api/v1/drug/safety-check` | **Y** |
| 5 | Med Reconcile | Med Reconcile (เทียบรายการยา) | POST | `/api/v1/med/reconcile` | **Y** |
| 6 | Check Drug All | All-in-one (DI + แพ้ยา + reconcile) | POST | `/api/v1/drug/check/all` | **Y** |
| 7 | Test Interaction | Contrast test (รองรับ TTMT) | POST | `/api/v1/drug/contrast/test` | **Y** |
| 8 | Optional | Send feedback คู่ยา | POST | `/api/v1/feedback/<ref_id>` | — |

> ทุก endpoint ใส่ header `apiKey: {YOUR-API-KEY}` และ `Content-Type: application/json`
> `page` / `row` เป็น query string (ดีฟอลต์ `page=1`, `row=10`) ใช้ได้กับ endpoint ที่คืน list

---

# 1. Drug

## API 1.1 — Get Drugs (ค้นหาโครงสร้างยา) · `PRD`

ค้นหาข้อมูลโครงสร้างยา (Drug Conceptual Information) จากฐาน **TMT** — คืนความสัมพันธ์ TPU → TP → GPU → GP → VTM + สารออกฤทธิ์ (SUBS)

- **Method:** `GET`
- **Endpoint:** `/api/v1/drugs`

### Request

**Headers**

| Name | Required | Type | Description |
|---|:--:|---|---|
| `apiKey` | Y | string | Authorization |

**Query String**

| Name | Required | Type | Default | Description |
|---|:--:|---|---|---|
| `page` | N | int | 1 | หน้าที่ต้องการ |
| `row` | N | int | 10 | จำนวน row ต่อหน้า |
| `keyword` | N | string | — | คำค้น (ชื่อยา/รหัส) |

```
curl --location '{{URL}}/api/v1/drugs?page=1&row=10&keyword=paracetamol' \
  --header 'Content-Type: application/json' \
  --header 'apiKey: {{YOUR-API-KEY}}'
```

### Response `200`

```json
{
  "status": true,
  "code": 200,
  "message": "get success",
  "data": {
    "pagination": { "page": 1, "row": 10, "total": 100 },
    "data": [
      {
        "tpu_code": "990853",
        "tpu_name": "VERAPAMIL (M 13781) suspension, 32 mL bottle",
        "tp_code": "990848",
        "tp_name": "VERAPAMIL/1 mL) oral suspension",
        "gpu_code": "990830",
        "gpu_name": "verapamil on, 32 mL bottle",
        "gp_code": "990824",
        "gp_name": "verapamil hydrochloride 5 mg/1 mL oral suspension",
        "vtm_code": "",
        "vtm_name": "",
        "description": "",
        "substances": [ { "code": "238376", "name": "ampicillin (SUBS)" } ]
      }
    ]
  }
}
```

---

# 2. Interaction

## API 2.1 — Contrast List With Code & PHR · `PRD`

ตรวจ **ความขัดแย้งของตัวยา (Drug Interaction / Conflict)** จากรหัสยา (TPU) ที่ส่งเข้ามา เทียบกับ **ยาในใบสั่งปัจจุบัน + ประวัติยาจาก PHR** (real-time) — รับยาได้หลายรายการต่อ request

- **Method:** `POST`
- **Endpoint:** `/api/v1/drug/contrast`

### Request Body

| Name | Required | Type | Description |
|---|:--:|---|---|
| `code` | Y | string[] | รหัสผลิตภัณฑ์ระดับ "Trade Product" — ยาปัจจุบันใช้ **TPU**, ยาแผนไทยใช้ **TTMT** · เช่น `["108159","256428"]` |
| `cid` | Y | string | เลขบัตรประชาชนผู้ป่วย |
| `hcode` | N | string | รหัสโรงพยาบาล 5 หลัก |
| `moph_access_token_idp` | N | string | Token ของ MOPH (จาก Provider ID) |
| `history_mode` | N | string | ระยะเวลาประวัติย้อนหลังที่ใช้ตรวจ (ดู [History mode](#history-mode)) ดีฟอลต์ = ภายในวันปัจจุบัน |

```
curl --location '{{URL}}/api/v1/drug/contrast' \
  --header 'Content-Type: application/json' \
  --header 'apiKey: {{YOUR-API-KEY}}' \
  --data '{
    "code": ["108246","734208","104721"],
    "hcode": "99999",
    "cid": "1111111111111",
    "history_mode": "",
    "moph_access_token_idp": "xxxxx"
  }'
```

### Response `200` (ย่อ 1 รายการ)

```json
{
  "status": true,
  "message": "drug interaction check successful",
  "code": 200,
  "data": {
    "pagination": { "page": 1, "row": 10, "total": 2 },
    "data": [
      {
        "ref_id": "1b2896dd-56bc-47d5-9e39-55af83babcb6",
        "input_tpu_code": "108246",
        "input_tpu_name": "APO-WARFARIN ... (warfarin sodium 4 mg) tablet, 1 tablet (TPU)",
        "input_vtm_code": "223088",
        "input_vtm_name": "warfarin sodium (VTM)",
        "contrast_tpu_code": "131639",
        "contrast_tpu_name": "NAPROXEN TABLETS 250 MG ... (naproxen 250 mg) tablet, 1 tablet (TPU)",
        "contrast_vtm_name": "naproxen (VTM)",
        "contrast_type": 1,
        "contrast_organization_code": "10988",
        "contrast_organization_name": "โรงพยาบาลเสนางคนิคม",
        "contrast_organization_record_date": "2026-02-19T15:19:21",
        "interaction_detail_en": "Concurrent use of ANTICOAGULANTS and NSAIDS may result in an increased risk of bleeding.",
        "interaction_detail_th": "การใช้ยาต้านการแข็งตัวของเลือดและยาต้านการอักเสบที่ไม่ใช่สเตียรอยด์ร่วมกันอาจทำให้มีความเสี่ยงต่อการมีเลือดออกเพิ่มขึ้น",
        "severity": "Major",
        "documentation": "Fair",
        "input_substances": [ { "code": "225929", "name": "warfarin sodium (SUBS)" } ],
        "contrast_substances": [ { "code": "224959", "name": "naproxen (SUBS)" } ]
      }
    ]
  }
}
```

- `contrast_type = 0` → คู่ยาที่ขัดแย้งกันภายในใบสั่งยา**ปัจจุบัน** · `1` → ขัดแย้งกับยาที่ผู้ป่วยเคยได้รับใน **Visit ที่ผ่านมา** (จะมี `contrast_organization_*` + `record_date`)
- ดู field ครบใน [Data Dictionary › Response contrast](#response-contrast)

---

# 3. Allergy

## API 3.1 — Check Drug Allergy · `PRD`

ตรวจ **การแพ้ยา (Drug Allergy)** — ส่งรหัสยา (TPU) เข้ามา ระบบจะคืนเฉพาะยาที่ผู้ป่วย (จาก `cid`) **แพ้** พร้อมอาการ + สาร (SUBS) ที่แพ้ ดึงจาก PHR real-time

> ⚠️ แจ้งเตือนแพ้ยา **เฉพาะเมื่อส่ง TPU Code ของยาที่แพ้เข้ามา** เท่านั้น

- **Method:** `POST`
- **Endpoint:** `/api/v1/drug/allergy`

### Request Body

| Name | Required | Type | Description |
|---|:--:|---|---|
| `code` | Y | string[] | รหัสยา TPU (แผนไทยใช้ TTMT) |
| `cid` | Y | string | เลขบัตรประชาชนผู้ป่วย |
| `moph_access_token_idp` | **Y** | string | Token ของ MOPH |
| `hcode` | N | string | รหัสโรงพยาบาล 5 หลัก |

```
curl --location '{{URL}}/api/v1/drug/allergy' \
  --header 'Content-Type: application/json' \
  --header 'apiKey: {{YOUR-API-KEY}}' \
  --data '{
    "code": ["1005195"],
    "hcode": "99999",
    "cid": "1111111111111",
    "moph_access_token_idp": "xxxxx"
  }'
```

### Response `200`

```json
{
  "status": true,
  "message": "drug allergy check successful",
  "code": 200,
  "data": {
    "pagination": { "page": 1, "row": 10, "total": 1 },
    "data": [
      {
        "input_tpu_code": "1005195",
        "input_tpu_name": "MILA-MADOL ... (tramadol hydrochloride 50 mg) capsule, hard, 1 capsule (TPU)",
        "input_vtm_name": "tramadol hydrochloride (VTM)",
        "allergy_type": 0,
        "allergy_substances": [
          {
            "code": "864627",
            "name": "tramadol hydrochloride (SUBS)",
            "verification_status": "confirmed",
            "seriousness": "ไม่ร้ายแรง (Non-serious)",
            "reaction": "Angioedema (บวมตามหน้า แสบร้อน คันตามคอหลัง)",
            "record_date": "2015-07-05",
            "organization_code": "",
            "organization_name": "",
            "group_type": 0,
            "group": ""
          }
        ]
      }
    ]
  }
}
```

---

# 4. Interaction & Allergy

## API 4.1 — Contrast & Allergy List With Code & PHR (Safety Check) · `PRD`

รวม **DI + แพ้ยา** ในเส้นเดียว — แยกผลด้วย `type_output` (`1` = contrast, `2` = allergy)

- **Method:** `POST`
- **Endpoint:** `/api/v1/drug/safety-check`

### Request Body

| Name | Required | Type | Description |
|---|:--:|---|---|
| `code` | Y | string[] | รหัสยา TPU / TTMT |
| `cid` | Y | string | เลขบัตรประชาชนผู้ป่วย |
| `moph_access_token_idp` | **Y** | string | Token ของ MOPH |
| `hcode` | N | string | รหัสโรงพยาบาล 5 หลัก |
| `history_mode` | N | string | ระยะเวลาประวัติย้อนหลัง (ดีฟอลต์ = ภายในวันปัจจุบัน) |

```
curl --location '{{URL}}/api/v1/drug/safety-check' \
  --header 'Content-Type: application/json' \
  --header 'apiKey: {{YOUR-API-KEY}}' \
  --data '{
    "code": ["108246","734208","104721","1005195"],
    "hcode": "99999",
    "cid": "1111111111111",
    "moph_access_token_idp": "xxxxx"
  }'
```

### Response `200` (ย่อ — มีทั้ง contrast และ allergy)

```json
{
  "status": true,
  "message": "drug interaction check successful",
  "code": 200,
  "data": {
    "pagination": { "page": 1, "row": 10, "total": 9 },
    "data": [
      {
        "type_output": 1,
        "type_output_text": "contrast",
        "input_tpu_code": "734208",
        "input_vtm_name": "rilpivirine (VTM)",
        "contrast_tpu_code": "104721",
        "contrast_vtm_name": "omeprazole (VTM)",
        "interaction_detail_th": "การใช้ RILPIVIRINE และ PROTON PUMP INHIBITORS ร่วมกัน...",
        "severity": "Contraindicated",
        "documentation": "Fair"
      },
      {
        "type_output": 2,
        "type_output_text": "allergy",
        "input_tpu_code": "1005195",
        "input_vtm_name": "tramadol hydrochloride (VTM)",
        "allergy_substances": [
          {
            "code": "864627",
            "name": "tramadol hydrochloride (SUBS)",
            "verification_status": "confirmed",
            "seriousness": "ไม่ร้ายแรง (Non-serious)",
            "reaction": "Angioedema (บวมตามหน้า แสบร้อน คันตามคอหลัง)",
            "record_date": "2015-07-05",
            "organization_code": "10988",
            "organization_name": "โรงพยาบาลเสนางคนิคม",
            "group_type": 0,
            "group": "ระวังการแพ้ยาในกลุ่ม Other"
          }
        ]
      }
    ]
  }
}
```

---

# 5. Med Reconcile

## API 5.1 — Med Reconcile · `PRD`

ดึง/เทียบ **รายการยาของผู้ป่วยในแต่ละช่วงการรักษา** จาก PHR — ดีฟอลต์เช็คย้อนหลัง **6 เดือน**

- **Method:** `POST`
- **Endpoint:** `/api/v1/med/reconcile`

### Request Body

| Name | Required | Type | Description |
|---|:--:|---|---|
| `cid` | Y | string | เลขบัตรประชาชนผู้ป่วย |
| `moph_access_token_idp` | **Y** | string | Token ของ MOPH |
| `hcode` | N | string | รหัสโรงพยาบาล 5 หลัก |
| `history_mode` | N | string | ระยะเวลาประวัติย้อนหลัง (ดีฟอลต์ = ภายในวันปัจจุบัน) |

```
curl --location '{{URL}}/api/v1/med/reconcile?page=1&row=100' \
  --header 'Content-Type: application/json' \
  --header 'apiKey: {{YOUR-API-KEY}}' \
  --data '{
    "hcode": "99999",
    "cid": "1111111111111",
    "history_mode": "",
    "moph_access_token_idp": "xxxxx"
  }'
```

### Response `200`

```json
{
  "status": true,
  "message": "check med reconcile successful",
  "code": 200,
  "data": {
    "pagination": { "page": 1, "row": 100, "total": 6 },
    "data": [
      {
        "tpu_code": "104721",
        "code_text": "Omeprazole 20 mg.",
        "qty": 60,
        "date": "19/02/2026",
        "organization_code": "10988",
        "patien_category": "Outpatient",
        "instruction": "11at (1*1 ac) กิน 1 เม็ดวันละ 1 ครั้งก่อนอาหารเช้า",
        "patient_instruction": "กิน 1 เม็ดวันละ 1 ครั้ง\r\nก่อนอาหารเช้า"
      }
    ]
  }
}
```

---

# 6. Check Drug All

## API 6.1 — Check Drugs All (All-in-one) · `PRD`

ตรวจ **DI + แพ้ยา + med reconcile** ในเส้นเดียว — ผลแยกเป็น 3 ก้อน `data.contrast` / `data.allergy` / `data.med_reconcile`

- **Method:** `POST`
- **Endpoint:** `/api/v1/drug/check/all`

### Request Body

| Name | Required | Type | Description |
|---|:--:|---|---|
| `code` | Y | string[] | รหัสยา TPU / TTMT |
| `cid` | Y | string | เลขบัตรประชาชนผู้ป่วย |
| `hcode` | **Y** | string | รหัสโรงพยาบาล 5 หลัก |
| `moph_access_token_idp` | **Y** | string | Token ของ MOPH |
| `history_mode` | N | string | ระยะเวลาประวัติย้อนหลัง (ดีฟอลต์ = ภายในวันปัจจุบัน) |
| `med_reconcile_history` | N | string | ระยะเวลาประวัติรับยาย้อนหลังของส่วน reconcile (ดีฟอลต์ `6M`) |

```
curl --location '{{URL}}/api/v1/drug/check/all' \
  --header 'Content-Type: application/json' \
  --header 'apiKey: {{YOUR-API-KEY}}' \
  --data '{
    "code": ["9031176","107958","536877"],
    "cid": "1111111111111",
    "hcode": "99999",
    "moph_access_token_idp": "xxxxx"
  }'
```

### Response `200` (โครงสร้าง 3 ก้อน)

```json
{
  "status": true,
  "message": "drug check demo v2 successful",
  "code": 200,
  "data": {
    "contrast": [ { "type_output": 1, "type_output_text": "contrast", "input_ttmt_code": "9031176", "...": "..." } ],
    "allergy":  [ { "type_output": 2, "type_output_text": "allergy",  "input_tpu_code": "1327715", "...": "..." } ],
    "med_reconcile": [
      {
        "code_text": "SIMETHICONE 80 mg.",
        "qty": 10,
        "date": "11/11/2025",
        "organization_code": "99999",
        "patien_category": "Outpatient",
        "instruction": "13pc รับประทานครั้งละ 1 เม็ด วันละ 3 ครั้ง หลังอาหารเช้า กลางวัน เย็น",
        "patient_instruction": "รับประทานครั้งละ 1 เม็ด\r\nวันละ 3 ครั้ง\r\nหลังอาหารเช้า กลางวัน เย็น"
      }
    ]
  }
}
```

> หมายเหตุ: ก้อน `contrast` รองรับทั้ง TPU และ TTMT (ยาแผนไทย เช่น "ขมิ้นชัน" → tirofiban = เพิ่มเสี่ยงเลือดออก)

---

# 7. Test Interaction (สำหรับทดสอบเท่านั้น)

## API 7.1 — Contrast List With Code & PHR (test) · `Conceptual`

เหมือน 2.1 แต่เป็นเส้นทดสอบ รองรับทั้ง **TPU + TTMT** และคืน field เต็มกว่า (`onset`, `significance`, `management`, `discussion`, `reference`, `contrast_ttmt_*`)

- **Method:** `POST`
- **Endpoint:** `/api/v1/drug/contrast/test`
- **Body:** เหมือน 2.1 (`code[]`, `cid`, `hcode?`, `moph_access_token_idp`, `history_mode?`)

```
curl --location '{{URL}}/api/v1/drug/contrast/test' \
  --header 'Content-Type: application/json' \
  --header 'apiKey: {{YOUR-API-KEY}}' \
  --data '{
    "code": ["9031176","107958"],
    "hcode": "99999",
    "cid": "1111111111111",
    "history_mode": "",
    "moph_access_token_idp": "xxxxx"
  }'
```

---

# 8. Optional API

## API 8.1 — Send feedback (คู่ยา) · `PRD`

ส่ง feedback เกี่ยวกับข้อมูลคู่ยา/DI ที่ระบบแสดงผล (ข้อมูลไม่ถูกต้อง / คำแนะนำ) โดยอ้างอิงด้วย `ref_id` ที่ได้จาก response ของ 2.1

- **Method:** `POST`
- **Endpoint:** `/api/v1/feedback/<ref_id>`

### Request

**Path param**

| Name | Required | Type | Description |
|---|:--:|---|---|
| `ref_id` | Y | string | reference id ของคู่ยาที่ต้องการ feedback |

**Body**

| Name | Required | Type | Description |
|---|:--:|---|---|
| `message` | Y | string | คำแนะนำ |

```
curl --location 'https://api-healthcare.manageai.co.th/mai/drug-datacenter/api/v1/feedback/<YOUR_REF_ID>' \
  --header 'apiKey: YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{ "message": "คำแนะนำ" }'
```

### Response `200`

```json
{ "status": true, "message": "send feedback success", "data": "", "code": 200 }
```

---

# Error Responses (ใช้ร่วมหลาย endpoint)

ทุก error เป็น envelope `{ status:false, data:"", message, code }`

| HTTP | message | กรณี |
|:--:|---|---|
| 401 | `unauthorized` | apiKey / access token ไม่ถูกต้อง |
| 400 | `code not found` | ไม่ส่ง `code` ของยา |
| 400 | `cid not found` | ไม่ส่งเลขบัตรประชาชน |
| 400 | `invalid cid` | เลขบัตรประชาชนผิดรูปแบบ |
| 400 | `hcode not found` | ไม่ส่งรหัส รพ. (เฉพาะ endpoint ที่บังคับ `hcode` เช่น 6.1) |
| 400 | `moph_access_token_idp not found` | ไม่ส่ง `moph_access_token_idp` / `moph_account_jwt` |
| 400 | `moph_access_token_idp has expired` | token หมดอายุ |
| 400 | `moph_access_token_idp is invalid` | รูปแบบ token ผิด |
| 403 | `IP not allowed` | IP ที่ยิงไม่อยู่ใน allow-list ของ รพ. (ดู changelog 1.0.15–1.0.16) |
| 400 | `unexpected` | error ที่ระบบระบุไม่ได้ |

---

# Data Dictionary

## Request fields

| Field | คำอธิบาย |
|---|---|
| `apiKey` | apiKey ที่ทีม ManageAI generate ให้ (Authentication) |
| `code` | รหัสผลิตภัณฑ์ระดับ "Trade Product" ของยาหลัก (TPU; ยาแผนไทย = TTMT) |
| `cid` | เลขบัตรประชาชนผู้ป่วย |
| `moph_access_token_idp` | access token จาก API ของทีม **Provider ID** ([moph-provider-id](../moph-provider-id/)) |
| `hcode` | รหัสโรงพยาบาล |
| `history_mode` | ระยะเวลาประวัติย้อนหลังที่ต้องการจาก PHR |
| `med_reconcile_history` | ระยะเวลาย้อนหลังของประวัติการรับยา (ส่วน reconcile) |

## History mode

ส่งเป็น string ต่อกันได้หลายหน่วย เช่น `7D1M2Y8M11D` (รวมทุกหน่วยที่เจอ)

| Value | ความหมาย |
|---|---|
| `nY` | จำนวนปีย้อนหลัง (เช่น `2Y` = 2 ปี) |
| `nM` | จำนวนเดือนย้อนหลัง (เช่น `6M` = 6 เดือน) |
| `nD` | จำนวนวันย้อนหลัง (เช่น `7D` = 7 วัน) |

## Response contrast

| Field | คำอธิบาย |
|---|---|
| `ref_id` | รหัสอ้างอิงเฉพาะของรายการ (ใช้กับ API feedback 8.1) |
| `input_ttmt_code` / `input_ttmt_name` | รหัส/ชื่อผลิตภัณฑ์ยาสมุนไพร (ยาหลัก) |
| `input_tpu_code` / `input_tpu_name` | รหัส/ชื่อ Trade Product Unit ของยาหลัก |
| `input_tp_code` / `input_tp_name` | รหัส/ชื่อ Trade Product ของยาหลัก |
| `input_gpu_code` / `input_gpu_name` | รหัส/ชื่อ Generic Product Unit ของยาหลัก |
| `input_gp_code` / `input_gp_name` | รหัส/ชื่อ Generic Product ของยาหลัก |
| `input_vtm_code` / `input_vtm_name` | รหัส/ชื่อสารออกฤทธิ์หลัก (Virtual Therapeutic Moiety) |
| `input_description` | คำอธิบายเพิ่มเติมของยาหลัก |
| `contrast_*` (ttmt/tpu/tp/gpu/gp/vtm/description) | ชุดรหัส/ชื่อของ "ยาที่เปรียบเทียบ" (โครงเดียวกับ input) |
| `contrast_type` | `0` = DI ภายในใบสั่งยาปัจจุบัน · `1` = DI กับยาที่ผู้ป่วยเคยได้รับใน Visit ก่อนหน้า |
| `contrast_organization_code` / `_name` | รหัส/ชื่อ รพ. ที่จ่ายยาคู่ขัดแย้ง (เมื่อ `contrast_type=1`) |
| `contrast_organization_record_date` | วันที่ผู้ป่วยได้รับยาคู่ขัดแย้ง |
| `interaction_detail_en` / `interaction_detail_th` | รายละเอียด DI (อังกฤษ/ไทย) |
| `onset` | ระยะเวลาเริ่มเกิดปฏิกิริยา (1=เร็ว, 2=ปานกลาง, 3=ช้า) |
| `severity` | ความรุนแรง: `Contraindicated` (ข้อห้าม) · `Major` (รุนแรง) · `Moderate` (ปานกลาง) · `Minor` (เล็กน้อย) |
| `documentation` | ความน่าเชื่อถือของเอกสารอ้างอิง: `Excellent` · `Good` · `Fair` |
| `significance` | ความสำคัญทางคลินิก |
| `management` | แนวทางจัดการเมื่อใช้ยาร่วมกัน |
| `discussion` | การอภิปรายเพิ่มเติม |
| `reference` | แหล่งอ้างอิง |
| `input_substances` / `contrast_substances` | รายการสารออกฤทธิ์ (code/name) ของยาหลัก/ยาเปรียบเทียบ |
| `type_output` | (เฉพาะ safety-check / check-all) `1` = contrast, `2` = allergy |
| `type_output_text` | `contrast` หรือ `allergy` |

## Response allergy_substances

| Field | คำอธิบาย |
|---|---|
| `code` | รหัสยามาตรฐาน 24 หลัก / รหัสยาหน่วยบริการ / รหัส TMT |
| `name` | ชื่อยา/สาร |
| `verification_status` | สถานะยืนยัน: `unconfirmed` (ไม่ยืนยัน) · `presumed` (สันนิษฐาน) · `confirmed` (ยืนยันแล้ว) |
| `seriousness` | ระดับความรุนแรง 8 ระดับ — `ไม่ร้ายแรง (Non-serious)`, `Death`, `Life-threatening`, `Hospitalization-initial`, `Hospitalization-prolonged`, `Disability`, `Congenital anomaly`, `อื่นๆ` |
| `reaction` | ลักษณะอาการแพ้ |
| `record_date` | วันที่พบว่าแพ้ |
| `organization_code` / `organization_name` | รหัส/ชื่อสถานบริการที่พบการแพ้ |
| `group_type` / `group` | กลุ่มของยา/คำเตือนกลุ่ม (เช่น "ระวังการแพ้ยาในกลุ่ม Other") |

## Response Med Reconcile

| Field | คำอธิบาย |
|---|---|
| `tpu_code` | รหัสผลิตภัณฑ์ระดับ Trade Product ของยา |
| `code_text` | ชื่อยาที่ผู้ป่วยได้รับ |
| `qty` | จำนวนที่ได้รับ |
| `date` | วันที่รับยา (`DD/MM/YYYY`) |
| `organization_code` | รหัส รพ. ที่จ่ายยา |
| `patien_category` | ประเภทผู้ป่วย (เช่น `Outpatient`) — *สะกดตามต้นฉบับ* |
| `instruction` | วิธีใช้ยา (ดิบจากระบบต้นทาง) |
| `patient_instruction` | วิธีใช้ยาสำหรับผู้ป่วย (จัดรูปแล้ว) |
