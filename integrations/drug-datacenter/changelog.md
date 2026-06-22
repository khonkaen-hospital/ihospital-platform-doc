# Changelog — API Drug Center (Drug Datacenter)

ต้นฉบับ [`source/API_Drug_Center_v1.0.30.gdoc.md`](source/API_Drug_Center_v1.0.30.gdoc.md) — "API Drug Center" ของ ManageAI (snapshot จาก Google Doc, ดึง 2026-06-22)

> หัวเอกสารระบุ **v1.0.30** แต่ version history ในเล่มลงรายละเอียดถึง **1.0.20** เท่านั้น

| Release | Date | รายละเอียด |
|---|---|---|
| 1.0.0 | 2025-04-27 | เพิ่ม substance ของตัวยา |
| 1.0.1 | 2025-04-28 | ตัด `Lang` ออกจาก request · เปลี่ยน contrast GET→POST + ส่ง `code` ผ่าน body · แยก `interaction_detail` เป็น `_en`/`_th` |
| 1.0.2 | 2025-04-28 | fix bug `apiKey` |
| 1.0.3 | 2025-05-06 | เพิ่ม validation ค่าว่าง · debug cypher (ใส่ได้แค่ TPUID) · no-contrast คืนค่าว่างแทน error 400 |
| 1.0.4 | 2025-05-07 | เพิ่ม `ref_id` ใน response (อ้างอิงคู่ยา) · เพิ่ม API Feedback คู่ยา · เพิ่ม Data Dictionary |
| 1.0.5 | 2025-07-17 | เก็บ logs การใช้งานทุก service + logs ของ check drug contrast |
| 1.0.6 | 2025-07-18 | Dashboard เห็นเฉพาะยอดจาก API Key |
| 1.0.7 | 2025-07-19 | patient info ดัก cid ผิด + บังคับ login ด้วย Provider ID · allergy ไม่เอา history ไป process + เพิ่ม SUBS/อาการที่แพ้ |
| 1.0.8 | 2025-07-24 | เพิ่ม API dashboard hospital · check contrast เพิ่ม `history_mode` · แก้ dashboard summary |
| 1.0.9 | 2025-07-25 | dashboard summary เพิ่ม `hcode` |
| 1.0.10 | 2025-07-29 | แก้ dashboard hospital (จำนวน request ตามวันที่) · Drug เพิ่ม validate moph access token |
| 1.0.11 | 2025-07-29 | แก้บัค validate moph access token |
| 1.0.12 | 2025-08-01 | เพิ่ม **Check Contrast V2** (ตรวจร่วม drug allergy) · แก้นับจำนวนยาทั้งหมด |
| 1.0.13 | 2025-08-08 | dashboard summary เพิ่มข้อมูลกลุ่มยา |
| 1.0.14 | 2025-08-14 | dashboard เพิ่มประเภท รพ. · ตรวจยาเพิ่ม error `code not found` · contrast V2: บังคับ `cid`+moph token, ย้าย allergy_reaction ไปใน allergy_substances, เพิ่ม verification_status/seriousness/record_date/reaction, เลือกเฉพาะ active + filter แพ้ยาข้ามสถานพยาบาล |
| 1.0.15 | 2025-08-27 | เพิ่ม feature **allow IP** ต่อโรงพยาบาล |
| 1.0.16 | 2025-08-29 | เพิ่ม API Hospital Get Access IP · เพิ่ม error message จาก Provider ID |
| 1.0.17 | 2025-09-02 | เพิ่ม API จัดการ user ในโรงพยาบาล · ดึงรายชื่อ รพ. บน dashboard ตามสิทธิ user |
| 1.0.18 | — | เพิ่ม API Hospital Get Access IP · error message จาก Provider ID (ซ้ำกับ 1.0.16 ในต้นฉบับ) |
| 1.0.19 | 2025-09-23 | เพิ่ม API Check CSAT + Create CSAT |
| 1.0.20 | 2025-09-30 | `/api/v2/drug/contrast` เพิ่ม `organization_code` / `organization_name` ใน response |

---

## โน้ตของทีม (KKH)

- 2026-06-22 — เพิ่ม integration จาก Google Doc ของ ManageAI; ถอด spec ครบ 8 endpoint (drugs / contrast / allergy / safety-check / med-reconcile / check-all / contrast-test / feedback) + data dictionary
- ขึ้นกับ [moph-provider-id](../moph-provider-id/) — ต้องมี `moph_access_token_idp` ก่อนเรียก endpoint ที่แตะข้อมูลผู้ป่วย
- ยังไม่ได้ขอ `apiKey` (UAT/PRD) — ช่องทางติดต่อ ManageAI ยังไม่ระบุในเอกสาร
- ตรวจสอบ: หัวเอกสาร 1.0.30 vs version history 1.0.20 — ยืนยันเวอร์ชันจริง + endpoint `/api/v2/drug/contrast` (เห็นใน changelog 1.0.20 แต่ body spec ในเล่มเป็น v1) กับ ManageAI
