# MOPH Health IoT Data Hub — API Specification (เต็ม)

ถอดจากต้นฉบับ `source/API_DOC_IoT_Data_Hub_1.10.pdf` (V1.10 · 30/03/2026)
อ่านสรุป + ข้อควรระวังก่อนที่ [`README.md`](README.md)

- **Base URL:** `moph-iot.moph.go.th` → endpoint = `{{base_url}}/api/...`
- **Auth:** ทุก request ใส่ header `Authorization: Bearer {{api_token}}` และ `Content-Type: application/json`
- **มาตรฐานข้อมูล:** HL7 FHIR (`Bundle` type `collection`) + LOINC (สำหรับ Observation)

---

## ภาพรวม API

| # | API | Method | Endpoint | ทิศทาง |
|---|---|---|---|---|
| 1 | Upsert Demographic | POST | `/api/iot-patient` | push (ส่งข้อมูลส่วนตัวผู้ป่วย) |
| 2 | Basic Health | POST | `/api/iot-observation-health` | push (ส่งข้อมูลสุขภาพ) |
| 3 | Device | POST | `/api/iot-device` | push (ส่งข้อมูลอุปกรณ์) |
| 4 | Telemedicine | GET | `/api/v1/patient-observation` | pull (ดึงข้อมูล observation) |

## Encryption wrapper (ใช้กับ API push 1–3 เท่านั้น)

payload ต้องเข้ารหัส **AES-256-GCM** แล้วส่งเป็น:

```json
{
  "data_count": 1,
  "data": "<base64( ciphertext + authTag )>"
}
```

- `data_count` = จำนวน Bundle ใน array (ก่อนเข้ารหัส)
- `data` = base64 ของผลลัพธ์ AES-256-GCM ที่เข้ารหัสจาก JSON string ของ **array ของ Bundle**
- รายละเอียดวิธีเข้ารหัส + โค้ดอ้างอิง: [`examples/encryption.nodejs.ts`](examples/encryption.nodejs.ts), [`examples/encryption.php`](examples/encryption.php) และหัวข้อ [Encryption — รายละเอียด](#encryption--รายละเอียด) ท้ายไฟล์

---

# API 1 — Upsert Demographic

ส่งข้อมูลส่วนตัวผู้ป่วยเข้าสู่ระบบ

- **Method:** `POST`
- **Endpoint:** `{{base_url}}/api/iot-patient`

โครงสร้าง FHIR: `Bundle` → `entry[]` → แต่ละ entry เป็น `resource` ชนิด **`Patient`** หรือ **`RelatedPerson`**

## Parameters — Patient resource

| Parameter | Type | Required | Description | Level |
|---|---|:--:|---|:--:|
| resourceType | String | Y | `Bundle` | 0 |
| type | String | Y | `collection` (ชุด resource หลายตัว ไม่มีลำดับ) | 0 |
| entry[] | Object[] | | | 0 |
| ‣ resource{} | Object | | | 1 |
| ‣‣ resourceType | String | Y | `Patient` | 2 |
| ‣‣ identifier[] | Object[] | | | 2 |
| ‣‣‣ system | String | N | ชื่อระบบที่เก็บ `cid` | 3 |
| ‣‣‣ value | String(13) | Y | เลขบัตรประชาชนผู้ป่วย (cid) | 3 |
| ‣‣‣ system | String | N | ชื่อระบบที่เก็บ `VN` | 3 |
| ‣‣‣ value | String | N | หมายเลข VN ผู้ป่วย | 3 |
| ‣‣ name[] | Object[] | | | 2 |
| ‣‣‣ given[] | String[] | N | ชื่อ (first name) | 3 |
| ‣‣‣ family | String | N | นามสกุล (last name) | 3 |
| ‣‣ gender | String | Y | `male` / `female` / `other` / `unknown` | 2 |
| ‣‣ birthDate | String | Y | วันเกิด `YYYY-MM-DD` | 2 |
| ‣‣ address[] | Object[] | | | 2 |
| ‣‣ use | String | N | `home` / `work` / `temp` / `old` / `billing` | 2 |
| ‣‣ type | String | N | `postal` / `physical` / `both` | 2 |
| ‣‣ line[] | String[] | N | ที่อยู่ เช่น `["111/11","ถนนพหลโยธิน"]` | 2 |
| ‣‣ subdistrict | String | Y | ตำบล/แขวง | 2 |
| ‣‣ district | String | Y | อำเภอ/เขต | 2 |
| ‣‣ province | String | Y | จังหวัด | 2 |
| ‣‣ postalCode | String | N | รหัสไปรษณีย์ | 2 |
| ‣‣ country | String | N | รหัสประเทศ 2 ตัวอักษร เช่น `TH` | 2 |
| ‣‣ extension[] | Object[] | | geolocation | 2 |
| ‣‣‣ url | String | N | ตัวระบุชนิด extension | 3 |
| ‣‣‣ extension[] | Object[] | | | 3 |
| ‣‣‣‣ url | String | N | `latitude` | 4 |
| ‣‣‣‣ valueDecimal | Double | N | เช่น `13.85138` (ทศนิยม 5–15 ตำแหน่ง) | 4 |
| ‣‣‣‣ url | String | N | `longitude` | 4 |
| ‣‣‣‣ valueDecimal | Double | N | เช่น `100.53017` (ทศนิยม 5–15 ตำแหน่ง) | 4 |
| ‣‣ managingOrganization{} | Object | | | 2 |
| ‣‣‣ reference | String | | อ้างอิงหน่วยงานที่บันทึก เช่น `Organization/10001` | 3 |
| ‣‣‣ display | String | | ชื่อโรงพยาบาล/แพทย์/เจ้าหน้าที่ | 3 |

> ⚠️ **address — ความไม่ตรงกันของชื่อ field:** ตาราง params ใช้ `subdistrict`/`district`/`province` แต่ตัวอย่าง JSON ที่ decrypt (ด้านล่าง) ใช้ `district`/`city`/`state` ตามรูปแบบ FHIR มาตรฐาน — **ต้องยืนยันกับ MOPH ว่า production รับ key ชุดไหน**

## Parameters — RelatedPerson resource (ญาติ)

| Parameter | Type | Required | Description | Level |
|---|---|:--:|---|:--:|
| ‣ resource{} | Object | | | 1 |
| ‣‣ resourceType | String | Y | `RelatedPerson` | 2 |
| ‣‣ identifier[] | Object[] | | | 2 |
| ‣‣‣ system | String | N | ระบบที่เก็บ cid ของญาติ | 3 |
| ‣‣‣ value | String(13) | N | cid ของญาติ | 3 |
| ‣‣ patient{} | Object | | | 3 |
| ‣‣‣ reference | String | Y | อ้างอิงผู้ป่วยแบบ `Patient/{cid}` เช่น `Patient/0000000000000` | 4 |
| ‣‣ relationship[] | Object[] | | | 3 |
| ‣‣‣ coding[] | Object[] | | | 4 |
| ‣‣‣‣ system | String | N | ระบบรหัสที่ใช้ | 5 |
| ‣‣‣‣ code | String | N | รหัสความสัมพันธ์ เช่น `MTH` | 5 |
| ‣‣‣‣ display | String | N | คำอ่านเต็ม เช่น `Mother` | 5 |
| ‣‣ name[] | Object[] | | | 3 |
| ‣‣‣ given[] | String[] | N | ชื่อญาติ | 4 |
| ‣‣‣ family | String | N | นามสกุลญาติ | 4 |

## ตัวอย่าง (decrypted body)

```json
{
  "data_count": 1,
  "data": [
    {
      "resourceType": "Bundle",
      "type": "collection",
      "entry": [
        {
          "resource": {
            "resourceType": "Patient",
            "identifier": [
              { "system": "Hospital A", "value": "0000000000000" },
              { "system": "Hospital A", "value": "12345" }
            ],
            "name": [ { "given": ["John"], "family": "Doe" } ],
            "gender": "male",
            "birthDate": "1992-01-01",
            "address": [
              {
                "use": "home",
                "type": "both",
                "line": ["111/11", "ถนนพหลโยธิน"],
                "district": "อนุสาวรีย์",
                "city": "บางเขน",
                "state": "กรุงเทพ",
                "postalCode": "10220",
                "country": "TH",
                "extension": [
                  {
                    "url": "http://hl7.org/fhir/StructureDefinition/geolocation",
                    "extension": [
                      { "url": "latitude", "valueDecimal": 13.85134 },
                      { "url": "longitude", "valueDecimal": 100.53017 }
                    ]
                  }
                ]
              }
            ],
            "managingOrganization": {
              "reference": "Organization/10001",
              "display": "Doctor A"
            }
          }
        },
        {
          "resource": {
            "resourceType": "RelatedPerson",
            "identifier": [ { "system": "Hospital A", "value": "1111111111111" } ],
            "patient": { "reference": "Patient/0000000000000" },
            "relationship": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/v3-RoleCode",
                    "code": "MTH",
                    "display": "Mother"
                  }
                ]
              }
            ],
            "name": [ { "given": ["Jane"], "family": "Doe" } ]
          }
        }
      ]
    }
  ]
}
```

---

# API 2 — Basic Health

ส่งข้อมูลสุขภาพ (vital signs / measurement) ของผู้ป่วย

- **Method:** `POST`
- **Endpoint:** `{{base_url}}/api/iot-observation-health`

โครงสร้าง FHIR: `Bundle` → `entry[]` → `resource` ชนิด **`Observation`** (หนึ่ง observation = หนึ่งค่าการวัด)

## Parameters — Observation resource

| Parameter | Type | Required | Description | Level |
|---|---|:--:|---|:--:|
| resourceType | String | Y | `Bundle` | 0 |
| type | String | Y | `collection` | 0 |
| entry[] | Object[] | | | 0 |
| ‣ resource{} | Object | | | 1 |
| ‣‣ resourceType | String | Y | `Observation` | 2 |
| ‣‣ status | String | Y | สถานะการสังเกต (FHIR Observation.status เช่น `final`) | 2 |
| ‣‣ code{} | Object | | | 2 |
| ‣‣‣ coding[] | Object[] | | | 3 |
| ‣‣‣‣ system | String | N | URL ระบบรหัส เช่น `http://loinc.org` | 4 |
| ‣‣‣‣ code | String | Y | รหัส LOINC เช่น `29463-7` | 4 |
| ‣‣‣‣ display | String | Y | ชื่อข้อมูล เช่น `Body Weight` | 4 |
| ‣‣ valueQuantity{} | Object | | | 2 |
| ‣‣‣ value | Double/Integer/Boolean | Y | ค่าที่วัดได้ | 3 |
| ‣‣‣ unit | String | Y | หน่วย เช่น `kg` | 3 |
| ‣‣ attachment{} | Object | | สำหรับไฟล์แนบ (เสียง/ภาพ/วิดีโอ) | 2 |
| ‣‣‣ url | String | N | URL ไฟล์ เช่น `sound1.mp3` | 3 |
| ‣‣‣ type | String | N | ประเภทไฟล์ เช่น `audio/mp3` | 3 |
| ‣‣‣ title | String | N | ชื่อไฟล์ เช่น `sound1` | 3 |
| ‣‣ effectiveDateTime | String | Y | วันเวลา UTC ISO 8601 เช่น `2025-02-04T20:19:54.504Z` | 2 |
| ‣‣ subject{} | Object | | | 2 |
| ‣‣‣ identifier{} | Object | | | 3 |
| ‣‣‣‣ value | String | Y | เลขบัตรประชาชนผู้ป่วย (cid) | 4 |
| ‣‣ device{} | Object | | | 2 |
| ‣‣‣ identifier{} | Object | | | 3 |
| ‣‣‣‣ value | String | N | รหัสอุปกรณ์ | 4 |
| ‣‣‣ reference | String | N | อ้างอิงไปยัง Device เช่น `Device/SN-002` | 3 |
| ‣‣‣ display | String | N | ชื่อ/คำอธิบายอุปกรณ์ | 3 |
| ‣‣ his_flag | Boolean | Y | `0` = ไม่ได้ส่งจาก HIS, `1` = ส่งจาก HIS | 2 |

> ⚠️ **`attachment.type` vs `contentType`:** ตาราง params ใช้ `type` แต่ตัวอย่าง JSON ที่ decrypt ใช้ `contentType` — ตรวจสอบกับ MOPH

## ตารางที่ 1 — รหัส LOINC ที่รองรับ

| code | display | ตัวอย่าง value | unit | Data Type | หมายเหตุ |
|---|---|---|---|---|---|
| 29463-7 | Body Weight | 23 / 45.75 | kg | Double | น้ำหนัก (kg) ทศนิยม 2 ตำแหน่ง |
| 8302-2 | Body Height | 151.12 / 175.50 | cm | Double | ส่วนสูง (cm) ทศนิยมอย่างน้อย 2 ตำแหน่ง |
| 8280-0 | Waist Circumference | 23.82 / 27.35 | cm | Double | เส้นรอบเอว (cm) ทศนิยมอย่างน้อย 2 ตำแหน่ง |
| 39156-5 | Body Mass Index | 10.28 / 28.4 | Kg/m2 | Double | ค่า BMI ทศนิยมอย่างน้อย 1 ตำแหน่ง |
| 8480-6 | Systolic Blood Pressure | 120.5 | mmHg | Double | ความดันตัวบน |
| 8462-4 | Diastolic Blood Pressure | 80.3 | mmHg | Double | ความดันตัวล่าง |
| 15074-8 | Glucose [Capillary Blood] | 95 | mg/dL | Integer | ระดับน้ำตาลในเลือด |
| 55284-4 | Blood Status | TRUE | — | Boolean | `false`=ตรวจตอนไม่งดอาหาร, `true`=ตรวจตอนงดอาหาร · **ส่งคู่ glucose เสมอ** |
| 8867-4 | Heart Rate | 89 | beats/min | Integer | ชีพจร (ครั้ง/นาที) |
| 80356-8 | Pulse Rhythm Irregular | TRUE | — | Boolean | ความสม่ำเสมอของชีพจร |
| 59408-5 | Oxygen Saturation | 98 | % | Integer | ออกซิเจนในเลือด (%) |
| 8310-5 | Body Temperature | 36.5 / 38.5 | C | Double | อุณหภูมิร่างกาย (°C) ทศนิยมอย่างน้อย 1 ตำแหน่ง |
| 9279-1 | Respiratory Rate | 25 / 18 | breaths/min | Integer | อัตราการหายใจ (ครั้ง/นาที) |
| 41950-7 | Step Count | 30000 / 3500 | steps | Integer | จำนวนก้าว (ต่อวัน) |
| 11492-6 | Heart Sound Audio | (ไฟล์) | — | String/File | เสียงปอด/เสียงหัวใจ · `title=sound1 type=audio/mp3 url=sound1.mp3` |
| 11524-6 | Electrocardiogram Image | (ไฟล์) | — | String/File | ภาพคลื่นไฟฟ้าหัวใจ · `title=ekg type=image/jpeg url=ekg.jpg` |
| 11520-4 | Ultrasound Video | (ไฟล์) | — | String/File | วิดีโออัลตราซาวนด์ · `title=ultrasound1 type=video/mp4 url=ultrasound1.mp4` |
| 72170-4 | Camera Image | (ไฟล์) | — | String/File | ภาพถ่าย · `title=camera type=image/jpeg url=file.jpg` |
| 44249-1 | Sleep Duration | 480 | minutes | Integer | ระยะเวลาการนอน (นาที) |

> ⚠️ ในตัวอย่าง JSON ที่ decrypt ใช้ code `24111-2` คู่กับ display `Heart Sound Audio` ซึ่ง **ไม่ตรง** กับตาราง LOINC (`11492-6`) — ยึดตาราง LOINC เป็นหลัก และยืนยันกับ MOPH

## ตัวอย่าง (decrypted body)

```json
{
  "data_count": 1,
  "data": [
    {
      "resourceType": "Bundle",
      "type": "collection",
      "entry": [
        {
          "resource": {
            "resourceType": "Observation",
            "status": "final",
            "code": { "coding": [ { "system": "http://loinc.org", "code": "29463-7", "display": "Body Weight" } ] },
            "valueQuantity": { "value": 23.00, "unit": "kg" },
            "effectiveDateTime": "2025-08-13T00:59:02.503Z",
            "subject": { "identifier": { "value": "0000000000000" } },
            "device": {
              "identifier": { "value": "SN-002" },
              "reference": "Device/SN-002",
              "display": "Smart Scale SN-002"
            }
          }
        },
        {
          "resource": {
            "resourceType": "Observation",
            "status": "final",
            "code": { "coding": [ { "system": "http://loinc.org", "code": "24111-2", "display": "Heart Sound Audio" } ] },
            "attachment": { "contentType": "audio/mp3", "url": "sound1.mp3", "title": "sound1" },
            "effectiveDateTime": "2025-08-13T00:59:02.503Z",
            "subject": { "identifier": { "value": "0000000000000" } },
            "device": {
              "identifier": { "value": "SN-001" },
              "reference": "Device/SN-001",
              "display": "Smart Scale SN-001"
            }
          }
        }
      ]
    }
  ]
}
```

---

# API 3 — Device

ส่งข้อมูลอุปกรณ์เข้าสู่ระบบ

- **Method:** `POST`
- **Endpoint:** `{{base_url}}/api/iot-device`

โครงสร้าง FHIR: `Bundle` → `entry[]` → `resource` ชนิด **`Device`**

## Parameters — Device resource

| Parameter | Type | Required | Description | Level |
|---|---|:--:|---|:--:|
| resourceType | String | Y | `Bundle` | 0 |
| type | String | Y | `collection` | 0 |
| entry[] | Object[] | | | 0 |
| ‣ resource{} | Object | | | 1 |
| ‣‣ resourceType | String | Y | `Device` | 2 |
| ‣‣ id | String | Y | ID อุปกรณ์ | 2 |
| ‣‣ deviceName[] | Object[] | | | 2 |
| ‣‣‣ name | String | Y | ชื่ออุปกรณ์ | 3 |
| ‣‣‣ type | String | Y | `registered-name` / `user-friendly-name` / `other` | 3 |
| ‣‣ type{} | Object | | | 2 |
| ‣‣‣ coding[] | Object[] | | | 3 |
| ‣‣‣‣ system | String | Y | URI ระบบรหัส (SNOMED CT / ICD-10) | 4 |
| ‣‣‣‣ code | String | Y | รหัสอุปกรณ์ | 4 |
| ‣‣‣‣ display | String | Y | คำอธิบายอุปกรณ์ | 4 |
| ‣‣ modelNumber | String | N | หมายเลขรุ่น | 2 |
| ‣‣ manufacturer | String | N | ผู้ผลิต | 2 |
| ‣‣ version[] | Object[] | | | 2 |
| ‣‣‣ type{}.text | String | N | `firmware` / `software` / `hardware` (และอื่น ๆ เช่น Bootloader) | 3–4 |
| ‣‣‣ value | String | N | เวอร์ชัน | 3 |
| ‣‣ status | String | Y | `active` / `inactive` / `entered-in-error` / `unknown` | 2 |
| ‣‣ owner{} | Object | | | 2 |
| ‣‣‣ reference | String | Y | URL อ้างอิง provider/องค์กร เช่น `Organization/PROV-001` | 3 |
| ‣‣‣ display | String | Y | ชื่อ provider/องค์กรเจ้าของอุปกรณ์ | 3 |
| ‣‣ property[] | Object[] | | คุณสมบัติอุปกรณ์ (sensor/module/certification) | 2 |
| ‣‣‣ type{}.text | String | Y | ประเภท property เช่น `Sensor Type` / `Sensor Module` / `Certification` | 3–4 |
| ‣‣‣ valueCode{}.coding[] | Object[] | | (กรณีอ้างอิงรหัส sensor) system/code/display | 3–5 |
| ‣‣‣ valueCode{}.text | String | | (กรณีค่าข้อความ) เช่น `AFE4404`, `ISO 80601`, `Self-declare` | 3–4 |

## ตัวอย่าง (decrypted body)

```json
{
  "data_count": 1,
  "data": [
    {
      "resourceType": "Bundle",
      "type": "collection",
      "entry": [
        {
          "resource": {
            "resourceType": "Device",
            "id": "SN-001",
            "deviceName": [ { "name": "Apple Watch Series 8", "type": "user-friendly-name" } ],
            "type": { "coding": [ { "system": "http://snomed.info/sct", "code": "706519004", "display": "Smart wearable device" } ] },
            "modelNumber": "Series 8 - Rev B",
            "manufacturer": "Apple Inc.",
            "version": [
              { "type": { "text": "Firmware" }, "value": "v1.2.9" },
              { "type": { "text": "Bootloader" }, "value": "BL-2025.01" }
            ],
            "status": "active",
            "owner": { "reference": "Organization/PROV-001", "display": "Bangkok Heart Hospital" },
            "property": [
              {
                "type": { "text": "Sensor Type" },
                "valueCode": { "coding": [ { "system": "http://snomed.info/sct", "code": "131328", "display": "Electrocardiogram sensor" } ] }
              },
              { "type": { "text": "Sensor Module" }, "valueCode": { "text": "AFE4404" } },
              { "type": { "text": "Certification" }, "valueCode": { "text": "Self-declare" } }
            ]
          }
        }
      ]
    }
  ]
}
```

## HTTP Response — API push (1–3)

ใช้ field naming แบบ **snake_case**

| Parameter | Type | Description |
|---|---|---|
| status_code | Integer | รหัสสถานะตอบกลับ |
| status_message | String | ข้อความตอบกลับ |
| data_count | Integer | จำนวนข้อมูลทั้งหมด |
| data_received | Integer | จำนวนข้อมูลที่บันทึกลงฐานข้อมูลสำเร็จ |
| data_rejected | Integer | จำนวนข้อมูลที่บันทึกไม่สำเร็จ |
| errors | String / Array | รายละเอียดข้อผิดพลาด (อาจเป็น `null`, สตริง หรือ array) |

> หมายเหตุ: หัวตารางในต้นฉบับสะกด `data_reveived` / `data_reject` แต่ตัวอย่าง JSON จริงใช้ `data_received` / `data_rejected` — **ยึดตามตัวอย่าง JSON**

### ตัวอย่าง response

```json
// 1) 400 — Field Error
{ "status_code": 400, "status_message": "field data: cannot be empty", "data_count": 0, "data_received": 0, "data_rejected": 0, "errors": null }

// 2) 400 — Decryption Error
{ "status_code": 400, "status_message": "field data: malformed encryption string", "data_count": 1, "data_received": 0, "data_rejected": 1, "errors": null }

// 3) 200 — Structure Error (HTTP 200 แต่ข้อมูลถูก reject)
{ "status_code": 200, "status_message": "success", "data_count": 1, "data_received": 0, "data_rejected": 1,
  "errors": [ { "index": 0, "message": "field cid: is empty or invalid length" } ] }

// 4) 200 — Success
{ "status_code": 200, "status_message": "success", "data_count": 1, "data_received": 1, "data_rejected": 0, "errors": [] }
```

> ⚠️ HTTP 200 ไม่ได้แปลว่าข้อมูลถูกบันทึกเสมอ — ต้องเช็ค `data_rejected` และ `errors[]` ด้วย (ดูเคส 3)

---

# API 4 — Telemedicine (ดึงข้อมูล)

ดึงข้อมูล observation ของผู้ป่วยเพื่อทำ Telemedicine

- **Method:** `GET`
- **Endpoint:** `{{base_url}}/api/v1/patient-observation`
- **ไม่มี encryption** ที่ body (เป็น GET) — ใช้ query parameters

## Query Parameters

| Parameter | Type | Required | Description |
|---|---|:--:|---|
| observationType | String | N | ฟิลเตอร์ด้วยประเภท observation (ดูค่าที่รองรับด้านล่าง) |
| startDate | String | N | วันเริ่มกรอง (ISO 8601) — **บังคับถ้าระบุ `endDate`** |
| endDate | String | N | วันสิ้นสุดกรอง (ISO 8601) — **บังคับถ้าระบุ `startDate`** |
| limit | Integer | N | จำกัดจำนวนรายการล่าสุดต่อประเภท |

> ⚠️ `startDate` กับ `endDate` ต้องมาคู่กันเสมอ ระบุมาตัวเดียวจะได้ `400 Bad Request`

**ค่า `observationType` ที่รองรับ:**
`temp` · `sleep` · `ecg` · `camera` · `waist` · `spo2` · `pulse_rhythm` · `weight` · `height` · `blood_status` · `respiratory_rate` · `systolic` · `diastolic` · `heart_sound` · `ultrasound` · `glucose` · `bmi` · `steps` · `hr`

## HTTP Response — API 4

ใช้ field naming แบบ **camelCase** (ต่างจาก API 1–3)

| Parameter | Type | Description |
|---|---|---|
| statusCode | Integer | รหัสสถานะตอบกลับ |
| statusMessage | String | ข้อความตอบกลับ |
| dataCount | Integer | จำนวนข้อมูลทั้งหมด |
| dataReceived | Integer | จำนวนข้อมูลที่บันทึกสำเร็จ |
| dataRejected | Integer | จำนวนข้อมูลที่บันทึกไม่สำเร็จ |
| errors | Object | รายละเอียดข้อผิดพลาด |
| data | Map | key = ประเภทการตรวจวัด (เช่น `bp`), value = list ของ observation |

### Observation Object Structure (แต่ละรายการใน list)

| Parameter | Type | Description |
|---|---|---|
| systolic | String | ค่าความดันช่วงบน |
| diastolic | String | ค่าความดันช่วงล่าง |
| device_id | String | รหัสอุปกรณ์ |
| observation_display | String | ชื่อสำหรับแสดงผล |
| observation_unit | String | หน่วยวัด (เช่น mmHg, kg, bpm) |
| observation_code | String | รหัสระบุประเภทการตรวจวัด |
| effective_datetime | String | วันเวลา ISO 8601 ที่บันทึกการตรวจวัด |

### ตัวอย่าง response

```json
// 5) 200 — Success
{
  "statusCode": 200,
  "statusMessage": "Success",
  "dataCount": 1,
  "dataReceived": 0,
  "dataRejected": 0,
  "errors": null,
  "data": {
    "bp": [
      {
        "systolic": "100",
        "diastolic": "60",
        "device_id": "MW-2025-002",
        "observation_display": "Blood Pressure",
        "observation_unit": "mmHg",
        "observation_code": "bp",
        "effective_datetime": "2026-01-28T06:30:36.000+00:00"
      }
    ]
  }
}

// 6) 400 — Bad Request (ระบุ startDate/endDate ไม่ครบคู่)
{
  "statusCode": 400,
  "statusMessage": "Both startDate and endDate must be provided together.",
  "dataCount": 0,
  "dataReceived": 0,
  "dataRejected": 0,
  "errors": null,
  "data": null
}
```

---

# Encryption — รายละเอียด

algorithm: **AES-256-GCM** (Advanced Encryption Standard, 256-bit key, Galois/Counter Mode)

ขั้นตอน (อ้างอิงโค้ดใน [`examples/`](examples/)):

1. **derive key:** `SHA-256(KEY)` → ได้ key 32 bytes (ต้องเป็น 32 bytes พอดี)
2. **nonce:** สร้าง buffer 12 bytes จากสตริง `NONCE` (ถ้าสั้นกว่า 12 pad ด้วย `\0`, ถ้ายาวกว่า truncate เหลือ 12)
3. **encrypt:** `AES-256-GCM(plaintext)` → ได้ `ciphertext` + `authTag` (16 bytes)
4. **รวม + encode:** `base64( ciphertext + authTag )` → ใส่ในฟิลด์ `data`
5. **decrypt:** base64 decode → แยก `authTag` (16 bytes สุดท้าย) ออกจาก `ciphertext` → `AES-256-GCM` decrypt ด้วย derived key + nonce + authTag

- **KEY และ NONCE จริง** MOPH ส่งให้ทางอีเมล (ในโค้ดตัวอย่างใช้ค่า placeholder `EXAMPLE-KEY` / `EXAMPLE-KEY-NONCE`)
- โค้ดอ้างอิงเต็ม: [`examples/encryption.nodejs.ts`](examples/encryption.nodejs.ts) (TypeScript) · [`examples/encryption.php`](examples/encryption.php) (PHP, ต้องเปิด `php_openssl`)
