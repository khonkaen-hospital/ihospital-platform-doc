---
name: API Drug Center (Drug Datacenter)
slug: drug-datacenter
system: ManageAI (manageai.co.th) — ศูนย์ข้อมูลยากลางอิง TMT (ตรวจ DI / แพ้ยา / med reconcile จาก PHR)
direction: pull              # เราส่ง code ยา + cid ไปดึงผล safety จาก PHR
base_url: UAT https://uat-api-healthcare.manageai.co.th/mai/drug-datacenter · PRD https://api-healthcare.manageai.co.th/mai/drug-datacenter
auth: apiKey (header) + moph_access_token_idp (MOPH-JWT จาก Provider ID) — บาง endpoint บังคับ
encryption: none (TLS)
data_standard: TMT (TPU/TP/GPU/GP/VTM + SUBS · ยาแผนไทย=TTMT) · JSON envelope {status,message,data,code}
version: 1.0.30 (changelog ในเล่มถึง 1.0.20 / 2025-09-30)
status: draft
source_doc: source/API_Drug_Center_v1.0.30.gdoc.md
source_updated: 2025-09-30
contact_apikey: ทีมพัฒนา ManageAI (generate apiKey ให้ — ช่องทางติดต่อไม่ระบุในเอกสาร)
---

# API Drug Center (Drug Datacenter)

บริการ **Clinical Decision Support ด้านยา** ของ ManageAI — โรงพยาบาลส่งรหัสยา (TMT/TPU) + เลขบัตรประชาชนผู้ป่วยเข้ามา ระบบจะดึงประวัติยา/แพ้ยาจาก **PHR (real-time)** แล้วคืน **ปฏิกิริยาระหว่างยา (DI)**, **การแพ้ยา**, และ **med reconciliation** เหมาะกับจุดจ่ายยา (point-of-dispensing)

> **สถานะ: draft** — ถอด spec ครบแล้ว (8 endpoint) ยังไม่ได้ขอ `apiKey` (UAT/PRD)
> **ขึ้นกับ [moph-provider-id](../moph-provider-id/)** — endpoint ส่วนใหญ่บังคับ `moph_access_token_idp` (MOPH-JWT) ที่ได้จาก Provider ID ก่อน

- **spec เต็ม:** [`spec.md`](spec.md)
- **ต้นฉบับ:** [`source/API_Drug_Center_v1.0.30.gdoc.md`](source/API_Drug_Center_v1.0.30.gdoc.md) — snapshot จาก [Google Doc](https://docs.google.com/document/d/1oJZ700FIOCNr8QcdvhCGPWfuLAre2q2s797VOE1Vp68/edit) (ดึง 2026-06-22)
- **changelog:** [`changelog.md`](changelog.md)

## ภาพรวม (Overview)

8 endpoint · ทุกเส้นใช้ header `apiKey` + `Content-Type: application/json`

| # | กลุ่ม | API | Method | Endpoint | moph token |
|---|---|---|---|---|:--:|
| 1 | Drug | ค้นโครงสร้างยา (TMT) | GET | `/api/v1/drugs` | — |
| 2 | Interaction | ตรวจ DI ร่วม PHR | POST | `/api/v1/drug/contrast` | optional |
| 3 | Allergy | ตรวจแพ้ยา | POST | `/api/v1/drug/allergy` | **Y** |
| 4 | DI + แพ้ยา | safety-check (รวมเส้นเดียว) | POST | `/api/v1/drug/safety-check` | **Y** |
| 5 | Med Reconcile | เทียบรายการยา (ดีฟอลต์ 6 ด.) | POST | `/api/v1/med/reconcile` | **Y** |
| 6 | All-in-one | DI + แพ้ยา + reconcile | POST | `/api/v1/drug/check/all` | **Y** |
| 7 | Test | contrast (รองรับ TTMT) — ทดสอบ | POST | `/api/v1/drug/contrast/test` | **Y** |
| 8 | Optional | ส่ง feedback คู่ยา | POST | `/api/v1/feedback/<ref_id>` | — |

**Base URL**

| Environment | Base URL |
|---|---|
| UAT | `https://uat-api-healthcare.manageai.co.th/mai/drug-datacenter` |
| PRD | `https://api-healthcare.manageai.co.th/mai/drug-datacenter` |

## Authentication

- ทุก request ใส่ header **`apiKey`** (ManageAI generate ให้ต่อ รพ.)
- endpoint ที่แตะข้อมูลผู้ป่วย (3–7) บังคับ **`moph_access_token_idp`** ใน body — เป็น MOPH-JWT ที่ได้จาก [Provider ID](../moph-provider-id/) (`moph_account_jwt` ก็ใช้ได้) → **ต้องทำ Provider ID ก่อน**
- มี **IP allow-list ต่อ รพ.** (เพิ่มใน 1.0.15) — IP นอก list ได้ `403 IP not allowed`

## รหัสยา / มาตรฐานข้อมูล

- ใช้ **TMT** เป็นแกน: ส่ง `code` เป็น **TPU** (ยาแผนปัจจุบัน) หรือ **TTMT** (ยาแผนไทย/สมุนไพร)
- response คืนความสัมพันธ์ครบชั้น: TPU → TP → GPU → GP → **VTM** + สารออกฤทธิ์ **SUBS**
- envelope มาตรฐาน: `{ status, message, data, code }` ทุก endpoint

## ข้อควรระวัง / Gotchas

- **ขึ้นกับ Provider ID** — `moph_access_token_idp` หมดอายุ/ผิดรูปแบบ → `400 moph_access_token_idp has expired|is invalid`; ไม่ส่ง → `400 ... not found`. ต้อง refresh token จาก Provider ID เอง
- **มี endpoint ทับซ้อนกัน 3 เส้น** — 4.1 `safety-check` (DI+แพ้ยา, ผลแบน type_output), 6.1 `check/all` (DI+แพ้ยา+reconcile, ผลแยก 3 ก้อน), 2.1+3.1 แยกเส้น เลือกตามหน้าจอ UI; **6.1 ให้ข้อมูลครบสุด**
- **โครง response ต่างกันระหว่างเส้น:** 2.1/3.1/4.1 คืน list ใน `data.data[]` (มี pagination) แต่ **6.1 คืน object** `data.contrast[]` / `data.allergy[]` / `data.med_reconcile[]` (ไม่มี pagination รวม) — parser ต้องแยกเคส
- **แพ้ยาเตือนเฉพาะยาที่ส่งเข้ามา** — ระบบเช็คเฉพาะ TPU ใน `code[]` ว่าตรงกับประวัติแพ้ไหม ไม่ได้คืนรายการแพ้ทั้งหมดของผู้ป่วย (ยกเว้นมีเส้น allergy-list แยก — ดู snapshot section ที่ขึ้นต้น "รายการการแพ้ยาคือข้อมูลการแพ้ยาทั้งหมด")
- **`contrast_type`** แยกที่มาของคู่ยา: `0` = ในใบสั่งปัจจุบัน · `1` = เทียบกับยาที่เคยได้รับ (มี `contrast_organization_*` + `record_date`) — ใช้บอกผู้ใช้ว่ายาคู่นี้มาจาก รพ.ไหน เมื่อไร
- **filter แพ้ยาข้ามสถานพยาบาล (1.0.14):** check-contrast V2 จะ "ไม่เอา" ประวัติแพ้ที่มาจาก รพ.ตัวเอง (ดูจาก `moph_access_token_idp` + `hcode`); ถ้า 2 ค่าไม่ตรงกันจะตัดทั้งสองแห่ง — ต้องส่ง `hcode` ให้ถูก
- **`history_mode`** เป็น string ต่อหน่วยได้ เช่น `7D1M2Y` (ดีฟอลต์ = ภายในวันปัจจุบัน); ส่วน reconcile ใน 6.1 ใช้ `med_reconcile_history` แยก (ดีฟอลต์ `6M`)
- **เวอร์ชันไม่ตรงกันในเอกสาร:** หัวเอกสารระบุ **1.0.30** แต่ตาราง version history มีถึง **1.0.20 (2025-09-30)** เท่านั้น — ของจริงควรยืนยันกับ ManageAI
- **สะกดผิดในต้นฉบับ (คงไว้ตามจริง):** `patien_category` (ไม่มี t), `keyworg` ในตัวอย่าง curl ของ 1.1, `Descripition`, `Dashbaord` — เวลาเขียน parser ให้ยึด key จริงตามที่ระบบส่งมา
- **ยาแผนไทย (TTMT):** เส้น production (2.1) ระบุรับ TTMT ได้ แต่ตัวอย่าง field `contrast_ttmt_*` เห็นชัดเฉพาะใน 6.1 และเส้น test (7.1) — ถ้าใช้สมุนไพรเยอะ ทดสอบกับ 7.1 ก่อน
