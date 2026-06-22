<!--
SOURCE SNAPSHOT — ถอดจาก Google Doc (text extraction ผ่าน Google Drive MCP)
URL: https://docs.google.com/document/d/1oJZ700FIOCNr8QcdvhCGPWfuLAre2q2s797VOE1Vp68/edit
เอกสาร: API Drug Center (Drug Datacenter) v1.0.30 — ManageAI
ดึงเมื่อ: 2026-06-22
หมายเหตุ: นี่คือ raw text snapshot (markdown ที่ Google Doc export ออกมา ตารางอาจเพี้ยน) ใช้เป็น source of truth — สรุปพร้อมใช้ดูที่ ../spec.md
-->

# ð API Service  

**ð¨ð»‍ð» API Drug Center (1.0.30)****  
** API Drug Center เป็นระบบศูนย์กลางข้อมูลสารออกฤทธิ์ทางยา (Active Pharmaceutical Ingredients: API) ที่ให้บริการข้อมูลยาอย่างเป็นระบบผ่าน RESTful API โดยใช้มาตรฐาน TMT (Thai Medicines Terminology) เป็นแกนกลางในการจัดโครงสร้างข้อมูลยา เพื่อให้สามารถเข้าถึงข้อมูลที่แม่นยำและเชื่อมโยงกันได้ เช่น ชื่อสามัญทางยา (Generic Name), สูตรเคมี, การใช้งาน, ผู้ผลิต, มาตรฐานที่เกี่ยวข้อง และข้อมูลการขึ้นทะเบียนยา ระบบถูกออกแบบให้รองรับการเชื่อมต่อกับแพลตฟอร์มอื่น ๆ ได้อย่างยืดหยุ่น เหมาะสำหรับนักพัฒนา หน่วยงานกำกับดูแล ซัพพลายเออร์ด้านยา และองค์กรในอุตสาหกรรมสุขภาพ โดยมีเป้าหมายในการยกระดับคุณภาพและความทันสมัยของการจัดการข้อมูลยาในประเทศไทยให้เป็นระบบ กลาง และสามารถนำไปประยุกต์ใช้ได้อย่างมีประสิทธิภาพ

  

# 

# ð± **Environment**

**UAT Environment**

  - https://uat-api-healthcare.manageai.co.th/mai/drug-datacenter

**PRD Environment**

  - https://api-healthcare.manageai.co.th/mai/drug-datacenter

  

# ð **Version**

**1.0.0** (2025-04-27)

  - เพิ่ม substance ของตัวยา

**1.0.1** (2025-04-28)

  - แก้ไข Request Parameter โดยไม่ต้องส่ง Lang
  - แก้ไข Method จาก Get เป็น Post และแก้ไขการส่ง code จาก Query String เป็น Body แทน
  - แก้ไข Response โดยแก้ไขจาก “interaction\_detail” เป็น “interaction\_detail\_en” และ “interaction\_detail\_th” แทน

**1.0.2** (2025-04-28)

  - fix bug apiKey

**1.0.3** (2025-05-06)

  - เพิ่ม validation ค่าว่าง ฯลฯ
  - debug cypher query (ให้ใส่ได้แค่ TPUID)
  - debug no contrast (จาก error 400 ให้เป็น ค่าว่างแทน)

**1.0.4** (2025-05-07)

  - แก้ไข Response API 1.1 โดยเพิ่ม  “ref\_id” สำหรับใช้ในการอ้างอิงคู่ยา
  - เพิ่ม API 1.2 สำหรับ Feedback คู่ยา
  - เพิ่ม Dictionnary สำหรับอธิบาย Response field

**1.0.5** (2025-07-17)

  - จัดเก็บ logs การใช้งานทุก service

<!-- end list -->

  - จัดเก็บ logs response check drugs contrast

**1.0.6** (2025-07-18)

  - ปรับให้ Dashbaord เห็นเฉพาะยอดที่มาจาก API Key

**1.0.7** (2025-07-19)

  - API patient info ดัก cid ผิด และบังคับ login ด้วย providerID
  - API allergy ไม่เอา history ไป process และเพิ่มข้อมูล SUBS ที่แพ้, อาการ

**1.0.8** (2025-07-24)

  - เพิ่ม API dashboard hospital

<!-- end list -->

  - API check drug contrast เพิ่ม history\_mode สำหรับเลือกระยะเวลาประวัติรักษาย้อนหลัง
  - API dashboard summary แก้ไขจำนวนตัวเลข และเพิ่มค่าจำนวนตรวจพบ

**1.0.9** (2025-07-25)

  - API dashboard summary เพิ่มข้อมูล hcode

**1.0.10** (2025-07-29)

  - แก้ไข API dashboard hospital จำนวน request ไม่ถูกต้องตามวันที่
  - API Drug เพิ่ม Validate moph access token

**1.0.11** (2025-07-29)

  - API Drug แก้ไขบัค Validate moph access token

**1.0.12** (2025-08-01)

  - เพิ่ม API Check Contrast V2 โดยตรวจสอบร่วมกับ Drug allergy
  - API Dashboard แก้ไขการนับจำนวนยาทั้งหมดในระบบ

**1.0.13** (2025-08-08)

  - ปรับ API Dashboard summary เพิ่มข้อมูลกลุ่มยา

**1.0.14** (2025-08-14)

1.  API Dashboard เพิ่มข้อมูลประเภทโรงพยาบาล
2.  API ตรวจยาทุกเส้น เพิ่ม error code not found กรณีไม่ส่ง code ของยา
3.  ปรับ API check contrast V2 ได้แก่

3.1 บังคับส่ง cid และ moph token

3.2 ลบฟิลด์ allergy\_reaction โดยจะระบุใน allergy\_substances แต่ละอันแทน

3.3 เพิ่มข้อมูลในผลการแพ้ยา

  - verification\_status คือ สถานะยืนยันการแพ้
  - seriousness คือ ระดับความร้ายแรง
  - record\_date คือ วันที่ตรวจพบ
  - reaction คือ อาการแพ้

3.4 เลือกข้อมูลแพ้ยาเฉพาะสถานะการแพ้เป็น active เท่านั้น

3.5 เลือกข้อมูลแพ้ยาเฉพาะที่ไม่ได้มาจากโรงพยาบาลของตนเอง

  - ข้อมูลสถานพยาบาลจะดึงจาก moph\_access\_token\_idp และ hcode (กรณีที่ส่ง)
  - กรณีที่สถานพยาบาลจาก moph\_access\_token\_idp และ hcode ไม่ตรงกัน ระบบจะเลือกข้อมูลแพ้ยาที่ไม่อยู่ในสถานพยาบาลทั้ง 2 แห่งนั้น

**1.0.15** (2025-08-27)

  - เพิ่ม Feature allow IP สำหรับแต่ละโรงพยาบาล

**1.0.16** (2025-08-29)

  - เพิ่ม API Hospital Get Access IP
  - เพิ่ม message error จาก provider ID

**1.0.17** (2025-09-02)

  - เพิ่ม API จัดการ user ในโรงพยาบาล
  - เพิ่ม API ดึงรายชื่อโรงพยาบาลบนหน้า Dashboard ตามสิทธิของ user

**1.0.18** ()

  - เพิ่ม API Hospital Get Access IP
  - เพิ่ม message error จาก provider ID

**1.0.19** (2025-09-23)

  - เพิ่ม API Check CSAT
  - เพิ่ม API Create CSAT

**1.0.20** (2025-09-30)

  - เพิ่ม ข้อมูล Response บนเส้น /api/v2/drug/contrast
      
      - organization\_code (รหัส รพ.)
      - organization\_name (ชื่อ รพ.)

  

# 

# ⚡ **API Spect**

## **1. Drug**

### **1.1 Get Drugs** **PRD**

**Endpoint**: /api/v1/drugs

**Method**: GET

**Content-Type**: application/json

**Descripition**: API สำหรับค้นหาข้อมูลโครงสร้างของยา (Drug Conceptual Information) โดยดึงข้อมูลจากฐานข้อมูลกลางของไทยคือ **TMT (Thai Medicines Terminology)** ซึ่งเป็นมาตรฐานการจำแนกและจัดกลุ่มข้อมูลยาในระดับต่าง ๆ เช่น **TPU Code**, **GPU Code**, และ **VTM Code** โดยสามารถระบุรหัสหรือชื่อยาเพื่อค้นหาข้อมูลเชิงโครงสร้างและความสัมพันธ์ของยาได้

  

## Request

**Headers**

|  |  |  |  |  |  |
| :-: | :-: | :-: | :-: | :-: | :-: |
| Name | Require | Type | Default | Description | Example |
| apiKey |  True | string | \\- | ใช้สำหรับ Authorization | \\- |

Query String 

|  |  |  |  |  |  |
| :-: | :-: | :-: | :-: | :-: | :-: |
| Name | Require | Type | Default | Description | Example |
| page |  False | int | 1 | page ที่ต้องการ | \\- |
| row |  False | int | 10 | จำนวน row ที่ต้องการ  | \\- |
| keyword |  False | string | \\- | keyword ที่ต้องการใช้ในการค้นหาข้อมูลยา | \\- |

  

## Response

|  |  |  |  |
| :-: | :-: | :-: | :-: |
| Name | Type | Description | Example |
| status | boolean | ผลลัพธ์ของการเรียก  | “true” or “false” |
| message | string | ข้อความสื่อสถานะ | “success” |
| data | string / object | ผลลัพธ์ที่ได้จาก API | {...} |
| code | int | HTTP Status Code เช่น 200 = สำเร็จ | 200 |

  
  

Example Request

|  |
| :-: |
| curl --location '{{URL}}/api/v1/drugs?page=1\\\&row=10\\\&keyworg=paracetamol' \\\\\\--header 'Content-Type: application/json' \\\\\\--header 'apiKey: {{YOUR-API-KEY}}' |

  

## Example Response

200 - Success

|  |
| :-: |
| {  &#10;  "status":true,  &#10;  "code":200,  &#10;  "message":"get success",  &#10;  "data":{  &#10;    "pagination":{  &#10;      "page":1,  &#10;      "row":10,  &#10;      "total":100  &#10;    },  &#10;    "data":\\\[  &#10;      {  &#10;        "tpu\\\_code":"990853",  &#10;        "tpu\\\_name":"VERAPAMIL (M 13781) suspension, 32 mL bottle",  &#10;        "tp\\\_code":"990848",  &#10;        "tp\\\_name":"VERAPAMIL/1 mL) oral suspension",  &#10;        "gpu\\\_code":"990830",  &#10;        "gpu\\\_name":"verapamil on, 32 mL bottle",  &#10;        "gp\\\_code":"990824",  &#10;        "gp\\\_name":"verapamil hydrochloride 5 mg/1 mL oral suspension",  &#10;        "vtm\\\_code":"",  &#10;        "vtm\\\_name":"",  &#10;        "description":"",  &#10;        "substances":\\\[  &#10;          {  &#10;            "code":"238376",  &#10;            "name":"ampicillin (SUBS)"  &#10;          }  &#10;        \\\],  &#10;      }  &#10;    \\\]  &#10;  }  &#10;} |

  

400 - Other Error

|  |
| :-: |
| {  &#10;    "status": false,  &#10;    "message": "Error message from api.",  &#10;    "data": "",  &#10;    "code": 400  &#10;} |

  

401 - Unauthorization

|  |
| :-: |
| {  &#10;    "status": false,  &#10;    "message": "unauthorization",  &#10;    "data": "",  &#10;    "code": 401  &#10;} |

  
  
  

## **2. Interaction**

### **2.1 Contrast List With Code & PHR** **PRD**

**Endpoint**: /api/v1/drug/contrast

**Method**: POST

**Content-Type**: application/json

**Descripition**: API สำหรับตรวจสอบความขัดแย้งของตัวยา (Drug Conflict) โดยใช้รหัสยา **TPU Code** ที่ได้จากระบบ **PHR (Personal Health Record)** ของผู้ป่วย **(ข้อมูลแบบ Real-Time)** เพื่อตรวจสอบว่ามียาใดที่ไม่ควรใช้ร่วมกันหรือไม่ โดยระบบจะประมวลผลข้อมูลยาจาก PHR และสามารถรับรหัสยาหลายรายการในคำขอเดียว เหมาะสำหรับใช้ในระบบจ่ายยา เพื่อป้องกันอันตรายจากการใช้ยาร่วมกัน

  

## Request

Headers

|  |  |  |  |  |  |
| :-: | :-: | :-: | :-: | :-: | :-: |
| Name | Require | Type | Default | Description | Example |
| apiKey |  True | string | \\- | ใช้สำหรับ Authorization | \\- |

Query String 

|  |  |  |  |  |  |
| :-: | :-: | :-: | :-: | :-: | :-: |
| Name | Require | Type | Default | Description | Example |
| page |  False | int | 1 | page ที่ต้องการ | \\- |
| row |  False | int | 10 | จำนวน row ที่ต้องการ  | \\- |

Body

|  |  |  |  |  |  |
| :-: | :-: | :-: | :-: | :-: | :-: |
| Name | Require | Type | Default | Description | Example |
| code |  True | string | \\- | รหัสผลิตภัณฑ์ระดับ "Trade Product" ของยาหลัก  &#10;\\- ยาปัจจุบันใช้ TPU\\- ยาแผนไทยใช้ TTMT  | \\\[“108159”,”256428”\\\] |
| hcode |  False | string | \\- | รหัสโรงพยาบาล 5 หลัก |   |
| cid |  True | string | \\- | รหัสบัตรประชาชนของผู้ป่วย (Citizen ID) | “1…………..1” |
| moph\\\_access\\\_token\\\_idp |  False | string | \\- | Token ของ moph |   |

  
  
  
  
  
  

## Response

|  |  |  |  |
| :-: | :-: | :-: | :-: |
| Name | Type | Description | Example |
| status | boolean | ผลลัพธ์ของการเรียก  | “true” or “false” |
| message | string | ข้อความสื่อสถานะ | “success” |
| data | string / object | ผลลัพธ์ที่ได้จาก API | {...} |
| code | int | HTTP Status Code เช่น 200 = สำเร็จ | 200 |

  

Example Request

|  |
| :-: |
| curl --location '{{URL}}/api/v1/drug/contrast' \\\\\\--header 'Content-Type: application/json' \\\\\\--header 'apiKey: {{YOUR-API-KEY}}' \\\\\\--data '{   "code": \\\[      "108246",      "734208",      "104721"   \\\],   "hcode": "99999",   "cid": "1111111111111",   "history\\\_mode": "",   "moph\\\_access\\\_token\\\_idp": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}' |

  
  

## Example Response

200 - Success

|  |
| :-: |
| {   "status": true,   "message": "drug interaction check successful",   "code": 200,   "data": {       "data": \\\[           {               "ref\\\_id": "6b13a0ee-67ab-4165-a4d3-73089708a493",               "input\\\_ttmt\\\_code": "",               "input\\\_ttmt\\\_name": "",               "input\\\_tpu\\\_code": "734208",               "input\\\_tpu\\\_name": "EDURANT (JANSSEN-CILAG, ITALY) (rilpivirine 25 mg) tablet, 1 tablet (TPU)",               "input\\\_tp\\\_code": "734190",               "input\\\_tp\\\_name": "EDURANT (JANSSEN-CILAG, ITALY) (rilpivirine 25 mg) tablet (TP)",               "input\\\_gpu\\\_code": "734188",               "input\\\_gpu\\\_name": "rilpivirine 25 mg tablet, 1 tablet (GPU)",               "input\\\_gp\\\_code": "734174",               "input\\\_gp\\\_name": "rilpivirine 25 mg tablet (GP)",               "input\\\_vtm\\\_code": "674494",               "input\\\_vtm\\\_name": "rilpivirine (VTM)",               "input\\\_description": "",               "contrast\\\_tpu\\\_code": "104721",               "contrast\\\_tpu\\\_name": "OMEPRAZOLE GPO (องค์การเภสัชกรรม) (omeprazole 20 mg) gastro-resistant capsule, hard, 1 capsule (TPU)",               "contrast\\\_tp\\\_code": "188040",               "contrast\\\_tp\\\_name": "OMEPRAZOLE GPO (องค์การเภสัชกรรม) (omeprazole 20 mg) gastro-resistant capsule, hard (TP)",               "contrast\\\_gpu\\\_code": "727267",               "contrast\\\_gpu\\\_name": "omeprazole 20 mg gastro-resistant capsule, hard, 1 capsule (GPU)",               "contrast\\\_gp\\\_code": "727251",               "contrast\\\_gp\\\_name": "omeprazole 20 mg gastro-resistant capsule, hard (GP)",               "contrast\\\_vtm\\\_code": "222303",               "contrast\\\_vtm\\\_name": "omeprazole (VTM)",               "contrast\\\_description": "",               "contrast\\\_type": 0,               "contrast\\\_organization\\\_code": "",               "contrast\\\_organization\\\_name": "",               "contrast\\\_organization\\\_record\\\_date": "",               "interaction\\\_detail\\\_en": "Concurrent use of RILPIVIRINE and PROTON PUMP INHIBITORS may result in reduced rilpivirine exposure, reduced efficacy of rilpivirine and an increased loss of virologic response.",               "interaction\\\_detail\\\_th": "การใช้ RILPIVIRINE และ PROTON PUMP INHIBITORS ร่วมกันอาจส่งผลให้การสัมผัสกับริลพิวิรีนลดลง ประสิทธิภาพของริลพิวิรีนลดลง และการสูญเสียการตอบสนองต่อไวรัสเพิ่มขึ้น",               "onset": "",               "severity": "Contraindicated",               "documentation": "Fair",               "significance": "",               "management": "",               "discussion": "",               "reference": "",               "input\\\_substances": \\\[                   {                       "code": "674473",                       "name": "rilpivirine (SUBS)"                   }               \\\],               "contrast\\\_substances": \\\[                   {                       "code": "225067",                       "name": "omeprazole (SUBS)"                   }               \\\]           },           {               "ref\\\_id": "1b2896dd-56bc-47d5-9e39-55af83babcb6",               "input\\\_ttmt\\\_code": "",               "input\\\_ttmt\\\_name": "",               "input\\\_tpu\\\_code": "108246",               "input\\\_tpu\\\_name": "APO-WARFARIN (APOTEX, CANADA) (warfarin sodium 4 mg) tablet, 1 tablet (TPU)",               "input\\\_tp\\\_code": "199487",               "input\\\_tp\\\_name": "APO-WARFARIN (APOTEX, CANADA) (warfarin sodium 4 mg) tablet (TP)",               "input\\\_gpu\\\_code": "210005",               "input\\\_gpu\\\_name": "warfarin sodium 4 mg tablet, 1 tablet (GPU)",               "input\\\_gp\\\_code": "220248",               "input\\\_gp\\\_name": "warfarin sodium 4 mg tablet (GP)",               "input\\\_vtm\\\_code": "223088",               "input\\\_vtm\\\_name": "warfarin sodium (VTM)",               "input\\\_description": "",               "contrast\\\_tpu\\\_code": "131639",               "contrast\\\_tpu\\\_name": "NAPROXEN TABLETS 250 MG (องค์การเภสัชกรรม) (naproxen 250 mg) tablet, 1 tablet (TPU)",               "contrast\\\_tp\\\_code": "185504",               "contrast\\\_tp\\\_name": "NAPROXEN TABLETS 250 MG (องค์การเภสัชกรรม) (naproxen 250 mg) tablet (TP)",               "contrast\\\_gpu\\\_code": "206872",               "contrast\\\_gpu\\\_name": "naproxen 250 mg tablet, 1 tablet (GPU)",               "contrast\\\_gp\\\_code": "217134",               "contrast\\\_gp\\\_name": "naproxen 250 mg tablet (GP)",               "contrast\\\_vtm\\\_code": "222199",               "contrast\\\_vtm\\\_name": "naproxen (VTM)",               "contrast\\\_description": "",               "contrast\\\_type": 1,               "contrast\\\_organization\\\_code": "10988",               "contrast\\\_organization\\\_name": "โรงพยาบาลเสนางคนิคม",               "contrast\\\_organization\\\_record\\\_date": "2026-02-19T15:19:21",               "interaction\\\_detail\\\_en": "Concurrent use of ANTICOAGULANTS and NSAIDS may result in an increased risk of bleeding.",               "interaction\\\_detail\\\_th": "การใช้ยาต้านการแข็งตัวของเลือดและยาต้านการอักเสบที่ไม่ใช่สเตียรอยด์ร่วมกันอาจทำให้มีความเสี่ยงต่อการมีเลือดออกเพิ่มขึ้น",               "onset": "",               "severity": "Major",               "documentation": "Fair",               "significance": "",               "management": "",               "discussion": "",               "reference": "",               "input\\\_substances": \\\[                   {                       "code": "225929",                       "name": "warfarin sodium (SUBS)"                   }               \\\],               "contrast\\\_substances": \\\[                   {                       "code": "224959",                       "name": "naproxen (SUBS)"                   }               \\\]           }       \\\],       "pagination": {           "page": 1,           "row": 10,           "total": 2       }   }} |

## 

## 3\. Allergy

### **3.1 Check Drug Allergy** **PRD**

**Endpoint**:  /api/v1/drug/allergy

**Method**: POST

**Content-Type**: application/json

**Descripition**:  API สำหรับตรวจสอบแพ้ยา (**Drug allergy**) โดยใช้รหัสยา TPU Code ที่ได้จากระบบ **PHR (Personal Health Record)** จาก CID ของผู้ป่วย **(ข้อมูลแบบ Real-Time)** เพื่อตรวจสอบว่าจากรหัสยาที่ส่งมา มียาใดที่บุคคลนั้นแพ้หรือไม่ โดยจะตอบกลับเป็นเฉพาะยาที่แพ้ รวมถึงอาการและสาร (SUBS) จากยาที่แพ้

\*\*การแจ้งเตือนแพ้ยาจะแจ้งเตือนในกรณีที่มีการส่ง TPU Code ของยาที่แพ้เข้ามาเท่านั้น

  

## Request

Headers

|  |  |  |  |  |  |
| :-: | :-: | :-: | :-: | :-: | :-: |
| Name | Require | Type | Default | Description | Example |
| apiKey |  True | string | \\- | ใช้สำหรับ Authorization | \\- |

Query String 

|  |  |  |  |  |  |
| :-: | :-: | :-: | :-: | :-: | :-: |
| Name | Require | Type | Default | Description | Example |
| page |  False | int | 1 | page ที่ต้องการ | \\- |
| row |  False | int | 10 | จำนวน row ที่ต้องการ  | \\- |

Body

|  |  |  |  |  |  |
| :-: | :-: | :-: | :-: | :-: | :-: |
| Name | Require | Type | Default | Description | Example |
| code |  True | string | \\- | รหัสผลิตภัณฑ์ระดับ "Trade Product" ของยาหลัก  &#10;\\- ยาปัจจุบันใช้ TPU\\- ยาแผนไทยใช้ TTMT  | \\\[“108159”,”256428”\\\] |
| hcode |  False | string | \\- | รหัสโรงพยาบาล 5 หลัก |   |
| cid |  True | string | \\- | รหัสบัตรประชาชนของผู้ป่วย (Citizen ID) | “1…………..1” |
| moph\\\_access\\\_token\\\_idp |  True | string | \\- | Token ของ moph |   |

  
  
  
  
  

## Response

|  |  |  |  |
| :-: | :-: | :-: | :-: |
| Name | Type | Description | Example |
| status | boolean | ผลลัพธ์ของการเรียก  | “true” or “false” |
| message | string | ข้อความสื่อสถานะ | “success” |
| data | string / object | ผลลัพธ์ที่ได้จาก API | {...} |
| code | int | HTTP Status Code เช่น 200 = สำเร็จ | 200 |

  

Example Request

|  |
| :-: |
| curl --location '{{URL}}/api/v1/drug/allergy' \\\\\\--header 'Content-Type: application/json' \\\\\\--header 'apiKey: {{YOUR-API-KEY}}' \\\\\\--data '{   "code": \\\[       "1005195"   \\\],   "hcode": "99999",   "cid": "1111111111111",   "history\\\_mode": "",   "moph\\\_access\\\_token\\\_idp": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}' |

  
  

## Example Response

200 - success

|  |
| :-: |
| {   "status": true,   "message": "drug allergy check successful",   "code": 200,   "data": {       "data": \\\[           {               "input\\\_tpu\\\_code": "1005195",               "input\\\_tpu\\\_name": "MILA-MADOL (มิลาโน) (tramadol hydrochloride 50 mg) capsule, hard, 1 capsule (TPU)",               "input\\\_tp\\\_code": "1005182",               "input\\\_tp\\\_name": "MILA-MADOL (มิลาโน) (tramadol hydrochloride 50 mg) capsule, hard (TP)",               "input\\\_gpu\\\_code": "864662",               "input\\\_gpu\\\_name": "tramadol hydrochloride 50 mg capsule, hard, 1 capsule (GPU)",               "input\\\_gp\\\_code": "864658",               "input\\\_gp\\\_name": "tramadol hydrochloride 50 mg capsule, hard (GP)",               "input\\\_vtm\\\_code": "864643",               "input\\\_vtm\\\_name": "tramadol hydrochloride (VTM)",               "input\\\_description": "",               "allergy\\\_type": 0,               "allergy\\\_substances": \\\[                   {                       "code": "864627",                       "name": "tramadol hydrochloride (SUBS)",                       "verification\\\_status": "confirmed",                       "seriousness": "ไม่ร้ายแรง (Non-serious)",                       "reaction": "Angioedema (บวมตามหน้า แสบร้อน คันตามคอหลัง)",                       "record\\\_date": "2015-07-05",                       "organization\\\_code": "",                       "organization\\\_name": "",                       "group\\\_type": 0,                       "group": ""                   }               \\\]           }       \\\],       "pagination": {           "page": 1,           "row": 10,           "total": 1       }   }} |

  
  
  
  

401 - unauthorized กรณีไม่มีสิทธิการใช้งาน เช่น accesstoken หรือ apikey ไม่ถูกต้อง

|  |
| :-: |
| {  &#10;  "code": 401,  &#10;  "data": "",  &#10;  "message": "unauthorized",  &#10;  "status": false  &#10;} |

  

400 - code not found กรณีไม่มีการส่ง code ของยา

|  |
| :-: |
| {  &#10;  "code": 400,  &#10;  "data": "",  &#10;  "message": "code not found",  &#10;  "status": false  &#10;} |

  

400 - cid not found กรณีไม่ส่งเลขบัตรประชาชน

|  |
| :-: |
| {  &#10;  "code": 400,  &#10;  "data": "",  &#10;  "message": "cid not found",  &#10;  "status": false  &#10;} |

  

400 - invalid cid กรณีใส่เลขบัตรประชาชนไม่ถูกต้อง

|  |
| :-: |
| {  &#10;  "code": 400,  &#10;  "data": "",  &#10;  "message": "invalid cid",  &#10;  "status": false  &#10;} |

  

400 - moph\_access\_token\_idp not found กรณีไม่ส่ง moph\_access\_token\_idp หรือ moph\_account\_jwt ที่ได้จาก provider ID

|  |
| :-: |
| {  &#10;  "code": 400,  &#10;  "data": "",  &#10;  "message": "moph\\\_access\\\_token\\\_idp not found",  &#10;  "status": false  &#10;} |

  

400 - moph\_access\_token\_idp has expired กรณี moph\_access\_token\_idp หรือ moph\_account\_jwt หมดอายุ

|  |
| :-: |
| {  &#10;  "code": 400,  &#10;  "data": "",  &#10;  "message": "moph\\\_access\\\_token\\\_idp has expired",  &#10;  "status": false  &#10;} |

  

400 - moph\_access\_token\_idp is invalid กรณีรูปแบบ moph\_access\_token\_idp หรือ moph\_account\_jwt ผิด

|  |
| :-: |
| {  &#10;  "code": 400,  &#10;  "data": "",  &#10;  "message": "moph\\\_access\\\_token\\\_idp is invalid",  &#10;  "status": false  &#10;} |

  

403 - IP not allowed กรณี IP request ไม่ได้รับอนุญาต

|  |
| :-: |
| {  &#10;  "code": 403,  &#10;  "data": "",  &#10;  "message": "IP not allowed",  &#10;  "status": false  &#10;} |

  

400 - unexpected กรณีเกิด error ที่ไม่สามารถระบุได้แน่ชัดของระบบ

|  |
| :-: |
| {  &#10;  "code": 400,  &#10;  "data": "",  &#10;  "message": "unexpected",  &#10;  "status": false  &#10;} |

## 4\. Interaction & Allergy

### **4.1 Contrast & Allergy List With Code & PHR** **PRD**

**Endpoint**: /api/v1/drug/safety-check

**Method**: POST

**Content-Type**: application/json

**Descripition**: API สำหรับตรวจสอบความขัดแย้งของตัวยา (Drug Conflict) และการแพ้ยา (Drug Allergy) โดยใช้รหัสยา **TPU Code** ที่ได้จากระบบ **PHR (Personal Health Record)** ของผู้ป่วย **(ข้อมูลแบบ Real-Time)** เพื่อตรวจสอบว่ามียาใดที่ไม่ควรใช้ร่วมกันหรือไม่ โดยระบบจะประมวลผลข้อมูลยาจาก PHR และสามารถรับรหัสยาหลายรายการในคำขอเดียว เหมาะสำหรับใช้ในระบบจ่ายยา เพื่อป้องกันอันตรายจากการใช้ยาร่วมกัน

\*\*การแจ้งเตือนแพ้ยาจะแจ้งเตือนในกรณีที่มีการส่ง TPU Code ของยาที่แพ้เข้ามาเท่านั้น  
  

## Request

Headers

|  |  |  |  |  |  |
| :-: | :-: | :-: | :-: | :-: | :-: |
| Name | Require | Type | Default | Description | Example |
| apiKey |  True | string | \\- | ใช้สำหรับ Authorization | \\- |

Query String 

|  |  |  |  |  |  |
| :-: | :-: | :-: | :-: | :-: | :-: |
| Name | Require | Type | Default | Description | Example |
| page |  False | int | 1 | page ที่ต้องการ | \\- |
| row |  False | int | 10 | จำนวน row ที่ต้องการ  | \\- |

Body

|  |  |  |  |  |  |
| :-: | :-: | :-: | :-: | :-: | :-: |
| Name | Require | Type | Default | Description | Example |
| code |  True | string | \\- | รหัสผลิตภัณฑ์ระดับ "Trade Product" ของยาหลัก  &#10;\\- ยาปัจจุบันใช้ TPU\\- ยาแผนไทยใช้ TTMT  | \\\[“108159”,”256428”\\\] |
| hcode |  False | string | \\- | รหัสโรงพยาบาล 5 หลัก |   |
| cid |  True | string | \\- | รหัสบัตรประชาชนของผู้ป่วย (Citizen ID) | “1…………..1” |
| moph\\\_access\\\_token\\\_idp |  True | string | \\- | Token ของ moph |   |
| history\\\_mode |  False | string | ภายในวันปัจจุบัน | \[ประเภท\](https://docs.google.com/document/d/1oJZ700FIOCNr8QcdvhCGPWfuLAre2q2s797VOE1Vp68/edit\#heading=h.h120bu98o1p) ระยะเวลาของประวัติรับยาย้อนหลังที่ใช้ตรวจสอบ | 7D1M2Y8M11D |

## Response

|  |  |  |  |
| :-: | :-: | :-: | :-: |
| Name | Type | Description | Example |
| status | boolean | ผลลัพธ์ของการเรียก  | “true” or “false” |
| message | string | ข้อความสื่อสถานะ | “success” |
| data | string / object | ผลลัพธ์ที่ได้จาก API | {...} |
| code | int | HTTP Status Code เช่น 200 = สำเร็จ | 200 |

  

Example Request

|  |
| :-: |
| curl --location '{{URL}}/api/v1/drug/safety-check' \\\\\\--header 'Content-Type: application/json' \\\\\\--header 'apiKey: {{YOUR-API-KEY}}' \\\\\\--data '{   "code": \\\[      "108246",      "734208",      "104721",      "1005195"   \\\],   "hcode": "99999",   "cid": "1111111111111",   "moph\\\_access\\\_token\\\_idp": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}' |

  
  

## Example Response

200 - success

|  |
| :-: |
| {   "status": true,   "message": "drug interaction check successful",   "code": 200,   "data": {       "data": \\\[           {               "type\\\_output": 1,               "type\\\_output\\\_text": "contrast",               "input\\\_ttmt\\\_code": "",               "input\\\_ttmt\\\_name": "",               "input\\\_tpu\\\_code": "734208",               "input\\\_tpu\\\_name": "EDURANT (JANSSEN-CILAG, ITALY) (rilpivirine 25 mg) tablet, 1 tablet (TPU)",               "input\\\_tp\\\_code": "734190",               "input\\\_tp\\\_name": "EDURANT (JANSSEN-CILAG, ITALY) (rilpivirine 25 mg) tablet (TP)",               "input\\\_gpu\\\_code": "734188",               "input\\\_gpu\\\_name": "rilpivirine 25 mg tablet, 1 tablet (GPU)",               "input\\\_gp\\\_code": "734174",               "input\\\_gp\\\_name": "rilpivirine 25 mg tablet (GP)",               "input\\\_vtm\\\_code": "674494",               "input\\\_vtm\\\_name": "rilpivirine (VTM)",               "input\\\_description": "",               "contrast\\\_tpu\\\_code": "104721",               "contrast\\\_tpu\\\_name": "OMEPRAZOLE GPO (องค์การเภสัชกรรม) (omeprazole 20 mg) gastro-resistant capsule, hard, 1 capsule (TPU)",               "contrast\\\_tp\\\_code": "188040",               "contrast\\\_tp\\\_name": "OMEPRAZOLE GPO (องค์การเภสัชกรรม) (omeprazole 20 mg) gastro-resistant capsule, hard (TP)",               "contrast\\\_gpu\\\_code": "727267",               "contrast\\\_gpu\\\_name": "omeprazole 20 mg gastro-resistant capsule, hard, 1 capsule (GPU)",               "contrast\\\_gp\\\_code": "727251",               "contrast\\\_gp\\\_name": "omeprazole 20 mg gastro-resistant capsule, hard (GP)",               "contrast\\\_vtm\\\_code": "222303",               "contrast\\\_vtm\\\_name": "omeprazole (VTM)",               "contrast\\\_type": 0,               "contrast\\\_organization\\\_code": "",               "contrast\\\_organization\\\_name": "",               "contrast\\\_organization\\\_record\\\_date": "",               "interaction\\\_detail\\\_en": "Concurrent use of RILPIVIRINE and PROTON PUMP INHIBITORS may result in reduced rilpivirine exposure, reduced efficacy of rilpivirine and an increased loss of virologic response.",               "interaction\\\_detail\\\_th": "การใช้ RILPIVIRINE และ PROTON PUMP INHIBITORS ร่วมกันอาจส่งผลให้การสัมผัสกับริลพิวิรีนลดลง ประสิทธิภาพของริลพิวิรีนลดลง และการสูญเสียการตอบสนองต่อไวรัสเพิ่มขึ้น",               "severity": "Contraindicated",               "documentation": "Fair",               "input\\\_substances": \\\[                   {                       "code": "674473",                       "name": "rilpivirine (SUBS)"                   }               \\\],               "contrast\\\_substances": \\\[                   {                       "code": "225067",                       "name": "omeprazole (SUBS)"                   }               \\\]           },           {               "type\\\_output": 2,               "type\\\_output\\\_text": "allergy",               "input\\\_ttmt\\\_code": "",               "input\\\_ttmt\\\_name": "",               "input\\\_tpu\\\_code": "1005195",               "input\\\_tpu\\\_name": "MILA-MADOL (มิลาโน) (tramadol hydrochloride 50 mg) capsule, hard, 1 capsule (TPU)",               "input\\\_tp\\\_code": "1005182",               "input\\\_tp\\\_name": "MILA-MADOL (มิลาโน) (tramadol hydrochloride 50 mg) capsule, hard (TP)",               "input\\\_gpu\\\_code": "864662",               "input\\\_gpu\\\_name": "tramadol hydrochloride 50 mg capsule, hard, 1 capsule (GPU)",               "input\\\_gp\\\_code": "864658",               "input\\\_gp\\\_name": "tramadol hydrochloride 50 mg capsule, hard (GP)",               "input\\\_vtm\\\_code": "864643",               "input\\\_vtm\\\_name": "tramadol hydrochloride (VTM)",               "input\\\_description": "",               "allergy\\\_substances": \\\[                   {                       "code": "864627",                       "name": "tramadol hydrochloride (SUBS)",                       "verification\\\_status": "confirmed",                       "seriousness": "ไม่ร้ายแรง (Non-serious)",                       "reaction": "Angioedema (บวมตามหน้า แสบร้อน คันตามคอหลัง)",                       "record\\\_date": "2015-07-05",                       "organization\\\_code": "10988",                       "organization\\\_name": "โรงพยาบาลเสนางคนิคม",                       "group\\\_type": 0,                       "group": "ระวังการแพ้ยาในกลุ่ม Other"                   }               \\\]           }       \\\],       "pagination": {           "page": 1,           "row": 10,           "total": 9       }   }} |

  

401 - unauthorized กรณีไม่มีสิทธิการใช้งาน เช่น accesstoken หรือ apikey ไม่ถูกต้อง

|  |
| :-: |
| {  &#10;  "code": 401,  &#10;  "data": "",  &#10;  "message": "unauthorized",  &#10;  "status": false  &#10;} |

  

400 - code not found กรณีไม่มีการส่ง code ของยา

|  |
| :-: |
| {  &#10;  "code": 400,  &#10;  "data": "",  &#10;  "message": "code not found",  &#10;  "status": false  &#10;} |

  

400 - cid not found กรณีไม่ส่งเลขบัตรประชาชน

|  |
| :-: |
| {  &#10;  "code": 400,  &#10;  "data": "",  &#10;  "message": "cid not found",  &#10;  "status": false  &#10;} |

  

400 - invalid cid กรณีใส่เลขบัตรประชาชนไม่ถูกต้อง

|  |
| :-: |
| {  &#10;  "code": 400,  &#10;  "data": "",  &#10;  "message": "invalid cid",  &#10;  "status": false  &#10;} |

  

400 - moph\_access\_token\_idp has expired กรณี moph\_access\_token\_idp หรือ moph\_account\_jwt หมดอายุ

|  |
| :-: |
| {  &#10;  "code": 400,  &#10;  "data": "",  &#10;  "message": "moph\\\_access\\\_token\\\_idp has expired",  &#10;  "status": false  &#10;} |

  

400 - moph\_access\_token\_idp is invalid กรณีรูปแบบ moph\_access\_token\_idp หรือ moph\_account\_jwt ผิด

|  |
| :-: |
| {  &#10;  "code": 400,  &#10;  "data": "",  &#10;  "message": "moph\\\_access\\\_token\\\_idp is invalid",  &#10;  "status": false  &#10;} |

  

403 - IP not allowed กรณี IP request ไม่ได้รับอนุญาต

|  |
| :-: |
| {  &#10;  "code": 403,  &#10;  "data": "",  &#10;  "message": "IP not allowed",  &#10;  "status": false  &#10;} |

  

400 - unexpected กรณีเกิด error ที่ไม่สามารถระบุได้แน่ชัดของระบบ

|  |
| :-: |
| {  &#10;  "code": 400,  &#10;  "data": "",  &#10;  "message": "unexpected",  &#10;  "status": false  &#10;} |

## 5\. Med Reconcile

### **5.1 Med Reconcile** **PRD**

**Endpoint**: /api/v1/med/reconcile

**Method**: POST

**Content-Type**: application/json

**Descripition**: API สำหรับตรวจสอบและเปรียบเทียบรายการยาของผู้ป่วย ในแต่ละช่วงของการรักษา ที่ได้จากระบบ **PHR (Personal Health Record)** โดยมีการเช็คประวัติย้อนหลัง 6 เดือน  
  

## Request

Headers

|  |  |  |  |  |  |
| :-: | :-: | :-: | :-: | :-: | :-: |
| Name | Require | Type | Default | Description | Example |
| apiKey |  True | string | \\- | ใช้สำหรับ Authorization | \\- |

Query String 

|  |  |  |  |  |  |
| :-: | :-: | :-: | :-: | :-: | :-: |
| Name | Require | Type | Default | Description | Example |
| page |  False | int | 1 | page ที่ต้องการ | \\- |
| row |  False | int | 10 | จำนวน row ที่ต้องการ  | \\- |

Body

|  |  |  |  |  |  |
| :-: | :-: | :-: | :-: | :-: | :-: |
| Name | Require | Type | Default | Description | Example |
| hcode |  False | string | \\- | รหัสโรงพยาบาล 5 หลัก |   |
| cid |  True | string | \\- | รหัสบัตรประชาชนของผู้ป่วย (Citizen ID) | “1…………..1” |
| moph\\\_access\\\_token\\\_idp |  True | string | \\- | Token ของ moph |   |
| history\\\_mode |  False | string | ภายในวันปัจจุบัน | \[ประเภท\](https://docs.google.com/document/d/1oJZ700FIOCNr8QcdvhCGPWfuLAre2q2s797VOE1Vp68/edit\#heading=h.h120bu98o1p) ระยะเวลาของประวัติรับยาย้อนหลังที่ใช้ตรวจสอบ | 7D1M2Y8M11D |

## Response

|  |  |  |  |
| :-: | :-: | :-: | :-: |
| Name | Type | Description | Example |
| status | boolean | ผลลัพธ์ของการเรียก  | “true” or “false” |
| message | string | ข้อความสื่อสถานะ | “success” |
| data | string / object | ผลลัพธ์ที่ได้จาก API | {...} |
| code | int | HTTP Status Code เช่น 200 = สำเร็จ | 200 |

  

Example Request

|  |
| :-: |
| curl --location '{{URL}}/api/v1/med/reconcile?page=1\\\&row=100' \\\\\\--header 'Content-Type: application/json' \\\\\\--header 'apiKey: {{YOUR-API-KEY}}' \\\\\\--data '{   "hcode": "99999",   "cid": "1111111111111",   "history\\\_mode": "",   "moph\\\_access\\\_token\\\_idp": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}' |

  

## Example Response

200 - success

|  |
| :-: |
| {   "status": true,   "message": "check med reconcile successful",   "code": 200,   "data": {       "data": \\\[           {               "tpu\\\_code": "125283",               "code\\\_text": "Ibuprofen 400 มก.",               "qty": 15,               "date": "19/02/2026",               "organization\\\_code": "10988",               "patien\\\_category": "Outpatient",               "instruction": "13pt(1 เม็ด \\\* 3 PC )ibuprofen - prnกินยาเมื่อมีอาการ  ครั้งละ  1   เม็ดห่างกันอย่างน้อย 6 ชั่วโมง ไม่เกินวันละ 3 ครั้งไม่กินขณะท้องว่าง เพื่อลดการระคายเคืองทางเดินอาหาร",               "patient\\\_instruction": "กินยาเมื่อมีอาการ  ครั้งละ  1   เม็ด\\\\r\\\\nห่างกันอย่างน้อย 6 ชั่วโมง ไม่เกินวันละ 3 ครั้ง\\\\r\\\\nไม่กินขณะท้องว่าง เพื่อลดการระคายเคืองทางเดินอาหาร"           },           {               "tpu\\\_code": "104721",               "code\\\_text": "Omeprazole 20 mg.",               "qty": 60,               "date": "19/02/2026",               "organization\\\_code": "10988",               "patien\\\_category": "Outpatient",               "instruction": "11at (1\\\*1 ac)กิน 1 เม็ดวันละ 1 ครั้งก่อนอาหารเช้า",               "patient\\\_instruction": "กิน 1 เม็ดวันละ 1 ครั้ง\\\\r\\\\nก่อนอาหารเช้า"           }       \\\],       "pagination": {           "page": 1,           "row": 100,           "total": 6       }   }} |

  

401 - unauthorized กรณีไม่มีสิทธิการใช้งาน เช่น accesstoken หรือ apikey ไม่ถูกต้อง

|  |
| :-: |
| {  &#10;  "code": 401,  &#10;  "data": "",  &#10;  "message": "unauthorized",  &#10;  "status": false  &#10;} |

  
  
  

400 - cid not found กรณีไม่ส่งเลขบัตรประชาชน

|  |
| :-: |
| {  &#10;  "code": 400,  &#10;  "data": "",  &#10;  "message": "cid not found",  &#10;  "status": false  &#10;} |

  

400 - invalid cid กรณีใส่เลขบัตรประชาชนไม่ถูกต้อง

|  |
| :-: |
| {  &#10;  "code": 400,  &#10;  "data": "",  &#10;  "message": "invalid cid",  &#10;  "status": false  &#10;} |

  

400 - moph\_access\_token\_idp has expired กรณี moph\_access\_token\_idp หรือ moph\_account\_jwt หมดอายุ

|  |
| :-: |
| {  &#10;  "code": 400,  &#10;  "data": "",  &#10;  "message": "moph\\\_access\\\_token\\\_idp has expired",  &#10;  "status": false  &#10;} |

  

400 - moph\_access\_token\_idp is invalid กรณีรูปแบบ moph\_access\_token\_idp หรือ moph\_account\_jwt ผิด

|  |
| :-: |
| {  &#10;  "code": 400,  &#10;  "data": "",  &#10;  "message": "moph\\\_access\\\_token\\\_idp is invalid",  &#10;  "status": false  &#10;} |

  

403 - IP not allowed กรณี IP request ไม่ได้รับอนุญาต

|  |
| :-: |
| {  &#10;  "code": 403,  &#10;  "data": "",  &#10;  "message": "IP not allowed",  &#10;  "status": false  &#10;} |

  

400 - unexpected กรณีเกิด error ที่ไม่สามารถระบุได้แน่ชัดของระบบ

|  |
| :-: |
| {  &#10;  "code": 400,  &#10;  "data": "",  &#10;  "message": "unexpected",  &#10;  "status": false  &#10;} |

  

## 6\. Check Drug All

### **6.1 Check Drugs All** **PRD**

**Endpoint**: /api/v1/drug/check/all

**Method**: POST

**Content-Type**: application/json

**Descripition**: API สำหรับตรวจสอบความขัดแย้งของตัวยา (Drug Conflict) และการแพ้ยา (Drug Allergy) โดยใช้รหัสยา **TPU Code** ที่ได้จากระบบ **PHR (Personal Health Record)** ของผู้ป่วย **(ข้อมูลแบบ Real-Time)** เพื่อตรวจสอบว่ามียาใดที่ไม่ควรใช้ร่วมกันหรือไม่รวมถึงรายชื่อยาของผู้ป่วยในแต่ละช่วงของการรักษา โดยระบบจะประมวลผลข้อมูลยาจาก PHR และสามารถรับรหัสยาหลายรายการในคำขอเดียว เหมาะสำหรับใช้ในระบบจ่ายยา เพื่อป้องกันอันตรายจากการใช้ยาร่วมกัน

\*\*รายการการแพ้ยาคือข้อมูลการแพ้ยาทั้งหมดที่ได้จากระบบ PHR  
  

## Request

Headers

|  |  |  |  |  |  |
| :-: | :-: | :-: | :-: | :-: | :-: |
| Name | Require | Type | Default | Description | Example |
| apiKey |  True | string | \\- | ใช้สำหรับ Authorization | \\- |

Body

|  |  |  |  |  |  |
| :-: | :-: | :-: | :-: | :-: | :-: |
| Name | Require | Type | Default | Description | Example |
| code |  True | string | \\- | รหัสผลิตภัณฑ์ระดับ "Trade Product" ของยาหลัก  &#10;\\- ยาปัจจุบันใช้ TPU\\- ยาแผนไทยใช้ TTMT  | \\\[“108159”,”256428”\\\] |
| cid |  True | string | \\- | รหัสบัตรประชาชนของผู้ป่วย (Citizen ID) | “1…………..1” |
| moph\\\_access\\\_token\\\_idp |  True | string | \\- | Token ของ moph |   |
| hcode |  True | string | \\- | รหัสโรงพยาบาล 5 หลัก |   |
| history\\\_mode |  False | string | ภายในวันปัจจุบัน | \[ประเภท\](https://docs.google.com/document/d/1oJZ700FIOCNr8QcdvhCGPWfuLAre2q2s797VOE1Vp68/edit\#heading=h.h120bu98o1p) ระยะเวลาของประวัติรับยาย้อนหลังที่ใช้ตรวจสอบ | 7D1M2Y8M11D |
| med\\\_reconcile\\\_history |  False | string | 6M | \[ประเภท\](https://docs.google.com/document/d/1oJZ700FIOCNr8QcdvhCGPWfuLAre2q2s797VOE1Vp68/edit\#heading=h.h120bu98o1p) ระยะเวลาของประวัติรับยาย้อนหลังที่ใช้ตรวจสอบ | 7D1M2Y8M11D |

## 

## Response

|  |  |  |  |
| :-: | :-: | :-: | :-: |
| Name | Type | Description | Example |
| status | boolean | ผลลัพธ์ของการเรียก  | “true” or “false” |
| message | string | ข้อความสื่อสถานะ | “success” |
| data | string / object | ผลลัพธ์ที่ได้จาก API | {...} |
| code | int | HTTP Status Code เช่น 200 = สำเร็จ | 200 |

  

Example Request

|  |
| :-: |
| curl --location '{{URL}}/api/v1/drug/check/all' \\\\\\--header 'Content-Type: application/json' \\\\\\--header 'apiKey: {{YOUR-API-KEY}}' \\\\\\--data '{   "code": \\\[       "9031176",       "107958",       "536877"   \\\],   "cid": "1111111111111",   "hcode": "99999",   "moph\\\_access\\\_token\\\_idp": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}' |

  

## Example Response

200 - success

|  |
| :-: |
| {   "status": true,   "message": "drug check demo v2 successful",   "code": 200,   "data": {       "contrast": \\\[                     {               "type\\\_output": 1,               "type\\\_output\\\_text": "contrast",               "input\\\_ttmt\\\_code": "",               "input\\\_ttmt\\\_name": "",               "input\\\_tpu\\\_code": "761174",               "input\\\_tpu\\\_name": "KETOCONAZOLE (องค์การเภสัชกรรม) (ketoconazole 200 mg) tablet, 1 tablet (TPU)",               "input\\\_tp\\\_code": "761161",               "input\\\_tp\\\_name": "KETOCONAZOLE (องค์การเภสัชกรรม) (ketoconazole 200 mg) tablet (TP)",               "input\\\_gpu\\\_code": "262631",               "input\\\_gpu\\\_name": "ketoconazole 200 mg tablet, 1 tablet (GPU)",               "input\\\_gp\\\_code": "262620",               "input\\\_gp\\\_name": "ketoconazole 200 mg tablet (GP)",               "input\\\_vtm\\\_code": "262612",               "input\\\_vtm\\\_name": "ketoconazole (VTM)",               "input\\\_description": "",               "contrast\\\_tpu\\\_code": "117618",               "contrast\\\_tpu\\\_name": "ZIMVA (20 MG) (องค์การเภสัชกรรม) (simvastatin 20 mg) film-coated tablet, 1 tablet (TPU)",               "contrast\\\_tp\\\_code": "195901",               "contrast\\\_tp\\\_name": "ZIMVA (20 MG) (องค์การเภสัชกรรม) (simvastatin 20 mg) film-coated tablet (TP)",               "contrast\\\_gpu\\\_code": "208621",               "contrast\\\_gpu\\\_name": "simvastatin 20 mg film-coated tablet, 1 tablet (GPU)",               "contrast\\\_gp\\\_code": "218884",               "contrast\\\_gp\\\_name": "simvastatin 20 mg film-coated tablet (GP)",               "contrast\\\_vtm\\\_code": "222621",               "contrast\\\_vtm\\\_name": "simvastatin (VTM)",               "contrast\\\_type": 0,               "contrast\\\_organization\\\_code": "",               "contrast\\\_organization\\\_name": "",               "contrast\\\_organization\\\_record\\\_date": "",               "interaction\\\_detail\\\_en": "Concurrent use of KETOCONAZOLE and SIMVASTATIN may result in increased simvastatin exposure and an increased risk of myopathy or rhabdomyolysis.",               "interaction\\\_detail\\\_th": "การใช้ KETOCONAZOLE และ SIMVASTATIN ร่วมกันอาจส่งผลให้มีการสัมผัสกับซิมวาสแตตินมากขึ้นและมีความเสี่ยงต่อภาวะกล้ามเนื้ออ่อนแรงหรือภาวะกล้ามเนื้อสลายมากขึ้น",               "severity": "Contraindicated",               "documentation": "Good",               "input\\\_substances": \\\[                   {                       "code": "262599",                       "name": "ketoconazole (SUBS)"                   }               \\\],               "contrast\\\_substances": \\\[                   {                       "code": "225411",                       "name": "simvastatin (SUBS)"                   }               \\\]           },           {               "type\\\_output": 1,               "type\\\_output\\\_text": "contrast",               "input\\\_ttmt\\\_code": "9031176",               "input\\\_ttmt\\\_name": "ขมิ้นชันห้วยเฮิร์บ (โรงพยาบาลห้วยทับทัน) (ขมิ้นชัน 500 มิลลิกรัม/แคปซูล) ยาแคปซูล",               "input\\\_tpu\\\_code": "",               "input\\\_tpu\\\_name": "",               "input\\\_tp\\\_code": "",               "input\\\_tp\\\_name": "",               "input\\\_gpu\\\_code": "",               "input\\\_gpu\\\_name": "",               "input\\\_gp\\\_code": "",               "input\\\_gp\\\_name": "",               "input\\\_vtm\\\_code": "",               "input\\\_vtm\\\_name": "",               "input\\\_description": "",               "contrast\\\_tpu\\\_code": "107958",               "contrast\\\_tpu\\\_name": "AGGRASTAT (D.S.M. PHARMACEUTICALS, U.S.A.) (tirofiban 250 mcg/1 mL) concentrate for solution for infusion, 50 mL vial (TPU)",               "contrast\\\_tp\\\_code": "198292",               "contrast\\\_tp\\\_name": "AGGRASTAT (D.S.M. PHARMACEUTICALS, U.S.A.) (tirofiban 250 mcg/1 mL) concentrate for solution for infusion (TP)",               "contrast\\\_gpu\\\_code": "209517",               "contrast\\\_gpu\\\_name": "tirofiban 250 mcg/1 mL concentrate for solution for infusion, 50 mL vial (GPU)",               "contrast\\\_gp\\\_code": "219757",               "contrast\\\_gp\\\_name": "tirofiban 250 mcg/1 mL concentrate for solution for infusion (GP)",               "contrast\\\_vtm\\\_code": "222927",               "contrast\\\_vtm\\\_name": "tirofiban (VTM)",               "contrast\\\_type": 0,               "contrast\\\_organization\\\_code": "",               "contrast\\\_organization\\\_name": "",               "contrast\\\_organization\\\_record\\\_date": "",               "interaction\\\_detail\\\_en": "Concurrent use of TURMERIC and ANTIPLATELET AGENTS may result in an increased risk of bleeding.",               "interaction\\\_detail\\\_th": "การใช้สารขมิ้นและสารต้านเกล็ดเลือดร่วมกันอาจทำให้มีความเสี่ยงต่อการมีเลือดออกเพิ่มขึ้น",               "severity": "Major",               "documentation": "Good",               "input\\\_substances": \\\[                   {                       "code": "714693",                       "name": "ขมิ้นชัน (SUBS)"                   }               \\\],               "contrast\\\_substances": \\\[                   {                       "code": "225725",                       "name": "tirofiban (SUBS)"                   }               \\\]           }       \\\],       "allergy": \\\[           {               "type\\\_output": 2,               "type\\\_output\\\_text": "allergy",               "input\\\_tpu\\\_code": "1327715",               "input\\\_tpu\\\_name": "SANACORE (เอเบิ้ล เมดิคอล) (adenosine 6 mg/2 mL) solution for injection, 2 mL vial (TPU)",               "input\\\_tp\\\_code": "1327704",               "input\\\_tp\\\_name": "SANACORE (เอเบิ้ล เมดิคอล) (adenosine 6 mg/2 mL) solution for injection (TP)",               "input\\\_gpu\\\_code": "536910",               "input\\\_gpu\\\_name": "adenosine 6 mg/2 mL solution for injection, 2 mL vial (GPU)",               "input\\\_gp\\\_code": "536906",               "input\\\_gp\\\_name": "adenosine 6 mg/2 mL solution for injection (GP)",               "input\\\_vtm\\\_code": "536896",               "input\\\_vtm\\\_name": "adenosine (VTM)",               "input\\\_description": "",               "allergy\\\_substances": \\\[                   {                       "code": "536877",                       "name": "adenosine (SUBS)",                       "verification\\\_status": "confirmed",                       "seriousness": "ไม่ร้ายแรง (Non-serious)",                       "reaction": "คัน",                       "record\\\_date": "2024-02-19",                       "organization\\\_code": "99999",                       "organization\\\_name": "โรงพยาบาลทดสอบBMS",                       "group\\\_type": 0,                       "group": "ระวังการแพ้ยาในกลุ่ม Other"                   }               \\\]           }       \\\],       "med\\\_reconcile": \\\[           {               "code\\\_text": "SIMETHICONE 80 mg.",               "qty": 10,               "date": "11/11/2025",               "organization\\\_code": "99999",               "patien\\\_category": "Outpatient",               "instruction": "13pc รับประทานครั้งละ 1 เม็ด วันละ 3 ครั้ง หลังอาหารเช้า กลางวัน เย็น",               "patient\\\_instruction": "รับประทานครั้งละ 1 เม็ด\\\\r\\\\nวันละ 3 ครั้ง\\\\r\\\\nหลังอาหารเช้า กลางวัน เย็น"           },           {               "code\\\_text": "AMOXICILLlN 500 mg.",               "qty": 20,               "date": "11/11/2025",               "organization\\\_code": "99999",               "patien\\\_category": "Outpatient",               "instruction": "2 OR10 2PC 2PC กินครั้งละ 2 แคปซูล หลังอาหารเช้า-เย็น หลังอาหารเช้า-เย็น",               "patient\\\_instruction": "กินครั้งละ 2 แคปซูล\\\\r\\\\nหลังอาหารเช้า-เย็น\\\\r\\\\nหลังอาหารเช้า-เย็น"           }       \\\]   }} |

  

401 - unauthorized กรณีไม่มีสิทธิการใช้งาน เช่น accesstoken หรือ apikey ไม่ถูกต้อง

|  |
| :-: |
| {  &#10;  "code": 401,  &#10;  "data": "",  &#10;  "message": "unauthorized",  &#10;  "status": false  &#10;} |

  

400 - cid not found กรณีไม่ส่งเลขบัตรประชาชน

|  |
| :-: |
| {  &#10;  "code": 400,  &#10;  "data": "",  &#10;  "message": "cid not found",  &#10;  "status": false  &#10;} |

  

400 - hcode not found กรณีไม่ส่งรหัส รพ.

|  |
| :-: |
| {  &#10;  "code": 400,  &#10;  "data": "",  &#10;  "message": "hcode not found",  &#10;  "status": false  &#10;} |

  

400 - invalid cid กรณีใส่เลขบัตรประชาชนไม่ถูกต้อง

|  |
| :-: |
| {  &#10;  "code": 400,  &#10;  "data": "",  &#10;  "message": "invalid cid",  &#10;  "status": false  &#10;} |

  

400 - moph\_access\_token\_idp has expired กรณี moph\_access\_token\_idp หรือ moph\_account\_jwt หมดอายุ

|  |
| :-: |
| {  &#10;  "code": 400,  &#10;  "data": "",  &#10;  "message": "moph\\\_access\\\_token\\\_idp has expired",  &#10;  "status": false  &#10;} |

  

400 - moph\_access\_token\_idp is invalid กรณีรูปแบบ moph\_access\_token\_idp หรือ moph\_account\_jwt ผิด

|  |
| :-: |
| {  &#10;  "code": 400,  &#10;  "data": "",  &#10;  "message": "moph\\\_access\\\_token\\\_idp is invalid",  &#10;  "status": false  &#10;} |

  

403 - IP not allowed กรณี IP request ไม่ได้รับอนุญาต

|  |
| :-: |
| {  &#10;  "code": 403,  &#10;  "data": "",  &#10;  "message": "IP not allowed",  &#10;  "status": false  &#10;} |

  

400 - unexpected กรณีเกิด error ที่ไม่สามารถระบุได้แน่ชัดของระบบ

|  |
| :-: |
| {  &#10;  "code": 400,  &#10;  "data": "",  &#10;  "message": "unexpected",  &#10;  "status": false  &#10;} |

  

## **7. Test Interaction** **(สำหรับทดสอบเท่านั้น)**

### **7.1 Contrast List With Code & PHR** **Conceptual**

**Endpoint**: /api/v1/drug/contrast/test

**Method**: POST

**Content-Type**: application/json

**Descripition**: API สำหรับตรวจสอบความขัดแย้งของตัวยา (Drug Conflict) โดยใช้รหัสยา **TPU Code** และ **TTMT Code** ที่ได้จากระบบ **PHR (Personal Health Record)** ของผู้ป่วย **(ข้อมูลแบบ Real-Time)** เพื่อตรวจสอบว่ามียาใดที่ไม่ควรใช้ร่วมกันหรือไม่ โดยระบบจะประมวลผลข้อมูลยาจาก PHR และสามารถรับรหัสยาหลายรายการในคำขอเดียว เหมาะสำหรับใช้ในระบบจ่ายยา เพื่อป้องกันอันตรายจากการใช้ยาร่วมกัน

  

## Request

Headers

|  |  |  |  |  |  |
| :-: | :-: | :-: | :-: | :-: | :-: |
| Name | Require | Type | Default | Description | Example |
| apiKey |  True | string | \\- | ใช้สำหรับ Authorization | \\- |

Query String 

|  |  |  |  |  |  |
| :-: | :-: | :-: | :-: | :-: | :-: |
| Name | Require | Type | Default | Description | Example |
| page |  False | int | 1 | page ที่ต้องการ | \\- |
| row |  False | int | 10 | จำนวน row ที่ต้องการ  | \\- |

Body

|  |  |  |  |  |  |
| :-: | :-: | :-: | :-: | :-: | :-: |
| Name | Require | Type | Default | Description | Example |
| code |  True | string | \\- | รหัสผลิตภัณฑ์ระดับ "Trade Product" ของยาหลัก  &#10;\\- ยาปัจจุบันใช้ TPU\\- ยาแผนไทยใช้ TTMT  | \\\[“108159”,”256428”\\\] |
| hcode |  False | string | \\- | รหัสโรงพยาบาล 5 หลัก |   |
| cid |  True | string | \\- | รหัสบัตรประชาชนของผู้ป่วย (Citizen ID) | “1…………..1” |
| moph\\\_access\\\_token\\\_idp |  True | string | \\- | Token ของ moph |   |

  
  
  
  
  
  

## Response

|  |  |  |  |
| :-: | :-: | :-: | :-: |
| Name | Type | Description | Example |
| status | boolean | ผลลัพธ์ของการเรียก  | “true” or “false” |
| message | string | ข้อความสื่อสถานะ | “success” |
| data | string / object | ผลลัพธ์ที่ได้จาก API | {...} |
| code | int | HTTP Status Code เช่น 200 = สำเร็จ | 200 |

  

Example Request

|  |
| :-: |
| curl --location '{{URL}}/api/v1/drug/contrast/test' \\\\\\--header 'Content-Type: application/json' \\\\\\--header 'apiKey: {{YOUR-API-KEY}}' \\\\\\--data '{ "code": \\\[   "9031176",   "107958" \\\], "hcode": "99999", "cid": "1111111111111", "history\\\_mode": "", "moph\\\_access\\\_token\\\_idp": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}' |

  
  

## Example Response

200 - Success

|  |
| :-: |
| {   "status": true,   "message": "",   "code": 200,   "data": {       "data": \\\[           {               "ref\\\_id": "0cbbbea7-0939-4d9d-b70a-b5d0d5a8a71a",               "input\\\_ttmt\\\_code": "9031176",               "input\\\_ttmt\\\_name": "ขมิ้นชันห้วยเฮิร์บ (โรงพยาบาลห้วยทับทัน) (ขมิ้นชัน 500 มิลลิกรัม/แคปซูล) ยาแคปซูล",               "input\\\_tpu\\\_code": "",               "input\\\_tpu\\\_name": "",               "input\\\_tp\\\_code": "",               "input\\\_tp\\\_name": "",               "input\\\_gpu\\\_code": "",               "input\\\_gpu\\\_name": "",               "input\\\_gp\\\_code": "",               "input\\\_gp\\\_name": "",               "input\\\_vtm\\\_code": "",               "input\\\_vtm\\\_name": "",               "input\\\_description": "",               "contrast\\\_ttmt\\\_code": "",               "contrast\\\_ttmt\\\_name": "",               "contrast\\\_tpu\\\_code": "107958",               "contrast\\\_tpu\\\_name": "AGGRASTAT (D.S.M. PHARMACEUTICALS, U.S.A.) (tirofiban 250 mcg/1 mL) concentrate for solution for infusion, 50 mL vial (TPU)",               "contrast\\\_tp\\\_code": "198292",               "contrast\\\_tp\\\_name": "AGGRASTAT (D.S.M. PHARMACEUTICALS, U.S.A.) (tirofiban 250 mcg/1 mL) concentrate for solution for infusion (TP)",               "contrast\\\_gpu\\\_code": "209517",               "contrast\\\_gpu\\\_name": "tirofiban 250 mcg/1 mL concentrate for solution for infusion, 50 mL vial (GPU)",               "contrast\\\_gp\\\_code": "219757",               "contrast\\\_gp\\\_name": "tirofiban 250 mcg/1 mL concentrate for solution for infusion (GP)",               "contrast\\\_vtm\\\_code": "222927",               "contrast\\\_vtm\\\_name": "tirofiban (VTM)",               "contrast\\\_description": "",               "contrast\\\_type": 0,               "contrast\\\_organization\\\_code": "",               "contrast\\\_organization\\\_name": "",               "contrast\\\_organization\\\_record\\\_date": "",               "interaction\\\_detail\\\_en": "Concurrent use of TURMERIC and ANTIPLATELET AGENTS may result in an increased risk of bleeding.",               "interaction\\\_detail\\\_th": "การใช้สารขมิ้นและสารต้านเกล็ดเลือดร่วมกันอาจทำให้มีความเสี่ยงต่อการมีเลือดออกเพิ่มขึ้น",               "onset": "",               "severity": "Major",               "documentation": "Good",               "significance": "",               "management": "",               "discussion": "",               "reference": "",               "input\\\_substances": \\\[                   {                       "code": "714693",                       "name": "TURMERIC(ขมิ้นชัน)"                   }               \\\],               "contrast\\\_substances": \\\[                   {                       "code": "225725",                       "name": "tirofiban (SUBS)"                   }               \\\]           }       \\\],       "pagination": {           "page": 1,           "row": 10,           "total": 1       }   }} |

  

## 

## 8.Optional API 

### **8.1 Send feedback** **PRD**

**Endpoint**: /api/v1/feedback/\<ref\_id\>

**Method**: POST

**Content-Type**: application/json

**Descripition**: API สำหรับส่งคำแนะนำ (Feedback) เกี่ยวกับข้อมูลยาที่แสดงผลจากระบบ เช่น ข้อมูลไม่ถูกต้อง หรือมีคำแนะนำเพิ่มเติม เกี่ยวกับคู่ยาที่มีความเสี่ยงต่อการเกิด **DI (Drug Interaction)**  โดยใช้ ref\_id อ้างอิงจากข้อมูลที่ผู้ใช้ต้องการให้ Feedback

  

## Request

Headers

|  |  |  |  |  |  |
| :-: | :-: | :-: | :-: | :-: | :-: |
| Name | Require | Type | Default | Description | Example |
| apiKey |  True | string | \\- | ใช้สำหรับ Authorization | \\- |

Params

|  |  |  |  |  |  |
| :-: | :-: | :-: | :-: | :-: | :-: |
| Name | Require | Type | Default | Description | Example |
| ref\\\_id |  True | int | \\- | reference id ที้ต้องการ feedback | \\- |

Body

|  |  |  |  |  |  |
| :-: | :-: | :-: | :-: | :-: | :-: |
| Name | Require | Type | Default | Description | Example |
| message |  True | string | \\- | คำแนะนำ | \\- |

  

## Response

|  |  |  |  |
| :-: | :-: | :-: | :-: |
| Name | Type | Description | Example |
| status | boolean | ผลลัพธ์ของการเรียก  | “true” or “false” |
| message | string | ข้อความสื่อสถานะ | “success” |
| data | string / object | ผลลัพธ์ที่ได้จาก API | {...} |
| code | int | HTTP Status Code เช่น 200 = สำเร็จ | 200 |

  
  
  
  
  
  

Example Request

|  |
| :-: |
| curl --location 'https://api-healthcare.manageai.co.th/mai/drug-datacenter/api/v1/feedback/\\\<YOUR\\\_REF\\\_ID\\\>' \\\\  &#10;\\--header 'apiKey: YOUR\\\_API\\\_KEY' \\\\  &#10;\\--header 'Content-Type: application/json' \\\\  &#10;\\--data '{  &#10;    "message": "คำแนะนำ"  &#10;}' |

  

## Example Response

200 - Success

|  |
| :-: |
| {  &#10;    "status": true,  &#10;    "message": "send feedback success",  &#10;    "data": "",  &#10;    "code": 200  &#10;} |

  

400 - Other Error

|  |
| :-: |
| {  &#10;    "status": false,  &#10;    "message": "Error message from api.",  &#10;    "data": "",  &#10;    "code": 400  &#10;} |

  

401 - Unauthorization

|  |
| :-: |
| {  &#10;    "status": false,  &#10;    "message": "unauthorization",  &#10;    "data": "",  &#10;    "code": 401  &#10;} |

  
  

### 

## Data Dictionnary

### **Request**

|  |  |
| :-: | :-: |
| \*\*Field Name\*\* | \*\*คำอธิบาย (Description)\*\* |
| apiKey | apiKey ที่ทางทีมพัฒนา Generate ให้เพื่อใช้เป็น Authentication |
| code | รหัสผลิตภัณฑ์ระดับ "Trade Product" ของยาหลัก |
| cid | รหัสบัตรประชาชนของผู้ป่วย |
| moph\\\_access\\\_token\\\_idp | access token ที่ได้จากการยิง API ของทีม ProviderID |
| hcode | รหัสโรงพยาบาล |
| history\\\_mode | ระยะเวลาที่ต้องการประวัติย้อนหลังจาก PHR |
| med\\\_reconcile\\\_history | ระยะเวลาที่ต้องการข้อมูลย้อนหลังของประวัติการรับยา |

  

### **History mode**

|  |  |
| :-: | :-: |
| Value | Meaning |
| nY | จำนวนปีย้อนหลัง เช่น 2Y คือ 2 ปีย้อนหลัง |
| nM | จำนวนเดือนย้อนหลัง เช่น 6M คือ 6 เดือนย้อนหลัง |
| nD | จำนวนวันย้อนหลัง เช่น 7D คือ 7 วันย้อนหลัง |

  

### **Response contrast**

|  |  |
| :-: | :-: |
| \*\*Field Name\*\* | \*\*คำอธิบาย (Description)\*\* |
| ref\\\_id | รหัสอ้างอิงเฉพาะของรายการข้อมูลนี้ |
| input\\\_ttmt\\\_code | รหัสผลิตภัณฑ์ยาสมุนไพร |
| input\\\_ttmt\\\_name | ชื่อผลิตภัณฑ์ยาสมุนไพร |
| input\\\_tpu\\\_code | รหัสผลิตภัณฑ์ระดับ "Trade Product Unit" ของยาหลัก |
| input\\\_tpu\\\_name | ชื่อผลิตภัณฑ์ระดับ "Trade Product Unit" ของยาหลัก |
| input\\\_tp\\\_code | รหัสผลิตภัณฑ์ระดับ "Trade Product" ของยาหลัก |
| input\\\_tp\\\_name | ชื่อผลิตภัณฑ์ระดับ "Trade Product" ของยาหลัก |
| input\\\_gpu\\\_code | รหัสผลิตภัณฑ์ระดับ "Generic Product Unit" ของยาหลัก |
| input\\\_gpu\\\_name | ชื่อผลิตภัณฑ์ระดับ "Generic Product Unit" ของยาหลัก |
| input\\\_gp\\\_code | รหัสผลิตภัณฑ์ระดับ "Generic Product" ของยาหลัก |
| input\\\_gp\\\_name | ชื่อผลิตภัณฑ์ระดับ "Generic Product" ของยาหลัก |
| input\\\_vtm\\\_code | รหัสของสารออกฤทธิ์หลัก (Virtual Therapeutic Moiety) |
| input\\\_vtm\\\_name | ชื่อของสารออกฤทธิ์หลัก (Virtual Therapeutic Moiety) |
| input\\\_description | คำอธิบายเพิ่มเติมเกี่ยวกับยาหลัก |
| contrast\\\_tpu\\\_code | รหัส Trade Product Unit ของยาที่เปรียบเทียบ |
| contrast\\\_tpu\\\_name | ชื่อ Trade Product Unit ของยาที่เปรียบเทียบ |
| contrast\\\_tp\\\_code | รหัส Trade Product ของยาที่เปรียบเทียบ |
| contrast\\\_tp\\\_name | ชื่อ Trade Product ของยาที่เปรียบเทียบ |
| contrast\\\_gpu\\\_code | รหัส Generic Product Unit ของยาที่เปรียบเทียบ |
| contrast\\\_gpu\\\_name | ชื่อ Generic Product Unit ของยาที่เปรียบเทียบ |
| contrast\\\_gp\\\_code | รหัส Generic Product ของยาที่เปรียบเทียบ |
| contrast\\\_gp\\\_name | ชื่อ Generic Product ของยาที่เปรียบเทียบ |
| contrast\\\_vtm\\\_code | รหัสสารออกฤทธิ์หลักของยาที่เปรียบเทียบ |
| contrast\\\_vtm\\\_name | ชื่อสารออกฤทธิ์หลักของยาที่เปรียบเทียบ |
| contrast\\\_description | คำอธิบายเพิ่มเติมเกี่ยวกับยาที่เปรียบเทียบ |
| contrast\\\_type  | ประเภทของการเกิดปฏิกิริยาระหว่างยา0 = การเกิดปฏิกิริยาระหว่างยาที่เกิดจากยาในใบสั่งยาปัจจุบัน1 = การเกิดปฏิกิริยาระหว่างยาที่เกิดจากยาในใบสั่งยาปัจจุบันกับยาที่ผู้ป่วยเคยได้รับใน Visit ที่ผ่านมา |
| contrast\\\_organization\\\_code | รหัส รพ. ที่จ่ายยาที่ทำให้เกิดปฏิกิริยาระหว่างยากับยาในใบสั่งยาปัจจุบัน |
| contrast\\\_organization\\\_name | ชื่อ รพ. ที่จ่ายยาที่ทำให้เกิดปฏิกิริยาระหว่างยากับยาในใบสั่งยาปัจจุบัน |
| contrast\\\_organization\\\_record\\\_date | วันที่ที่ผู้ป่วยได้รับยาที่ทำให้เกิดปฏิกิริยาระหว่างยากับยาในใบสั่งยาปัจจุบัน |
| interaction\\\_detail\\\_en | รายละเอียดการเกิดปฏิกิริยาระหว่างยา (ภาษาอังกฤษ) |
| interaction\\\_detail\\\_th | รายละเอียดการเกิดปฏิกิริยาระหว่างยา (ภาษาไทย) |
| onset | ระยะเวลาการเริ่มเกิดปฏิกิริยา (เช่น 1 = เร็ว, 2 = ปานกลาง, 3 = ช้า) |
| severity | ความรุนแรงของปฏิกิริยา1\.  Contraindicated = ข้อห้าม&#10;2.  Major = รุนแรง&#10;3.  Moderate = ปานกลาง&#10;4.  Minor = เล็กน้อย |
| documentation | ระดับความน่าเชื่อถือของข้อมูลจากเอกสารอ้างอิง1\.  Excellent = ดีเยี่ยม&#10;2.  Good = ดี&#10;3.  Fair = พอใช้ได้ |
| significance | ความสำคัญทางคลินิกของปฏิกิริยา |
| management | แนวทางการจัดการเมื่อมีการใช้ยาร่วมกัน |
| discussion | การอภิปรายเพิ่มเติมจากแหล่งข้อมูล |
| reference | แหล่งข้อมูลอ้างอิง เช่น หนังสือหรือฐานข้อมูล |
| input\\\_substances | รายการสารออกฤทธิ์ของยาหลัก (พร้อมรหัส/ชื่อ) |
| contrast\\\_substances | รายการสารออกฤทธิ์ของยาที่เปรียบเทียบ (พร้อมรหัส/ชื่อ) |
| type\\\_output | 1 = ผลลัพธ์จาก drug interaction (contrast)2 = ผลลัพธ์จาก drug allergy |
| type\\\_output\\\_text | ประเภทของผลลัพธ์1\.  contrast&#10;2.  allergy |

  

### **Response allergy\_substances**

|  |  |
| :-: | :-: |
| \*\*Field Name\*\* | \*\*คำอธิบาย (Description)\*\* |
| code | รหัสยามาตรฐานที่กําหนดเป็น 24 หลัก หรือรหัสยาของหน่วยบริการ หรือรหัสยา TMT |
| name | ชื่อยา |
| verification\\\_status | รหัสการยืนยัน1\.  unconfirmed = ไม่ได้รับการยืนยัน&#10;2.  presumed = สันนิษฐาน&#10;3.  confirmed = ได้รับการยืนยัน |
| seriousness | ระดับความรุนแรงของยา 8 ระดับ1\.  ไม่ร้ายแรง (Non-serious)&#10;2.  ร้ายแรง - เสียชีวิต (Death)&#10;3.  ร้ายแรง - อันตรายถึงชีวิต (Life-threatening)&#10;4.  ร้ายแรง - ต้องเข้ารับการรักษาในโรงพยาบาล (Hospitalization-initial)&#10;5.  ร้ายแรง - ทำให้เพิ่มระยะเวลาในการรักษานานขึ้น (Hospitalization-prolonged)&#10;6.  ร้ายแรง - พิการ (Disability)&#10;7.  ร้ายแรง - เป็นเหตุให้เด็กความผิดปกติตั้งแต่กำเนิด (Congenital anomaly)&#10;8.  ร้ายแรง - อื่นๆ |
| reaction | ลักษณะอาการแพ้ยา |
| record\\\_date | วันที่พบว่าแพ้ยา |
| organization\\\_code | รหัสสถานบริการที่พบว่าแพ้ยา |
| organization\\\_name | ชื่อสถานบริการที่พบว่าแพ้ยา |

  

### **Response Med Reconcile**

|  |  |
| :-: | :-: |
| \*\*Field Name\*\* | \*\*คำอธิบาย (Description)\*\* |
| tpu\\\_code | รหัสผลิตภัณฑ์ระดับ "Trade Product" ของยาหลัก |
| code\\\_text | ชื่อยาที่ผู้ป่วยได้รับ |
| qty | จำนวนที่ผู้ป่วยได้รับ |
| date | วันที่รับยา |
| organization\\\_code | รหัส รพ. ที่จ่ายยา |
| patien\\\_category | ประเภทผู้ป่วย |
| instruction | วิธีการใช้ยา |
| patient\\\_instruction | วิธีการใช้ยาสำหร