# INDEX — Integration Catalog

catalog กลางของทุก integration ในแพลตฟอร์ม **ihospital-platform**
จัดกลุ่มตาม **ชั้นงาน** เรียงตามลำดับที่ควรลงมือ — คลิก "เอกสาร" เพื่อเข้าโฟลเดอร์ของ integration นั้น

**สรุปสถานะ:** 1 active (IoT Data Hub) · 12 draft (รอถอด spec/รอ key) · เจ้าของหลัก **สำนักสุขภาพดิจิทัล (BDH)** สป.สธ. + **กรมการปกครอง (DOPA)** สำหรับ ThaID + **ManageAI** สำหรับ Drug Datacenter

---

## ชั้น 1 — Identity & Auth (ทำก่อนสุด)

> เป็น prerequisite ของเกือบทุกตัวด้านล่าง ได้ token/scope ชุดนี้แล้วค่อยต่อระบบอื่น

| # | Integration | หน้าที่ | ทิศทาง | Auth | สถานะ | เอกสาร |
|:--:|---|---|:--:|---|:--:|:--:|
| 1 | ThaID (DOPA — กรมการปกครอง) | ยืนยันตัวตนประชาชนด้วยบัตร ปชช./แอป ThaID (OAuth2+OIDC) — รากของ "บัตรใบเดียว" | pull | OAuth2/OIDC | draft | [→](integrations/thai-id/) |
| 2 | MOPH Provider ID / Health ID | Login OAuth (Health ID) → Provider ID token + profile/สังกัด + MOPH-JWT (idp/fdh/pcu) | pull | OAuth2 | draft | [→](integrations/moph-provider-id/) |

## ชั้น 2 — ส่งข้อมูลขึ้นส่วนกลาง (Submission / Finance)

| # | Integration | หน้าที่ | ทิศทาง | Auth | สถานะ | เอกสาร |
|:--:|---|---|:--:|---|:--:|:--:|
| 3 | HDC — 43 แฟ้ม | ส่งข้อมูลบริการมาตรฐาน (บังคับทุก รพ.) → คลังข้อมูลสุขภาพชาติ | push | credential | draft | [→](integrations/moph-hdc-43files/) |
| 4 | MOPH Financial Data Hub (FDH) | ส่งข้อมูลการเงิน เบิกจ่าย 30 บาทรักษาทุกที่ real-time | push | OAuth | draft | [→](integrations/moph-fdh/) |
| — | MOPH Health IoT Data Hub | ส่งข้อมูลสุขภาพจากอุปกรณ์ IoT + ดึง Telemedicine | push + pull | Bearer | **active** | [→](integrations/moph-iot-data-hub/) |

## ชั้น 3 — แลกเปลี่ยน / ส่งต่อ (HIE & Referral)

| # | Integration | หน้าที่ | ทิศทาง | Auth | สถานะ | เอกสาร |
|:--:|---|---|:--:|---|:--:|:--:|
| 5 | Health Link (HIE) | แลกเปลี่ยน EMR ข้าม รพ. ทั่วประเทศ (FHIR) | push + pull | consent/OAuth | draft | [→](integrations/moph-health-link/) |
| 6 | e-Referral | ส่งต่อ/รับผู้ป่วยข้ามหน่วยบริการ | push + pull | TBD | draft | [→](integrations/moph-ereferral/) |
| 7 | Cancer Anywhere | ส่งต่อ/ดูประวัติผู้ป่วยมะเร็ง (QR+Token) | push + pull | QR+Token | draft | [→](integrations/moph-cancer-anywhere/) |

## ชั้น 4 — บริการถึงประชาชน (หมอพร้อม / PHR)

> ทุกตัวอิง OAuth ของ Provider ID (ชั้น 1)

| # | Integration | หน้าที่ | ทิศทาง | Auth | สถานะ | เอกสาร |
|:--:|---|---|:--:|---|:--:|:--:|
| 8 | MOPH PHR / H4U | ส่งประวัติบริการเข้าสมุดสุขภาพประชาชน | push | OAuth | draft | [→](integrations/moph-phr-h4u/) |
| 9 | MOPH Immunization Center | บันทึก/ดึงประวัติวัคซีน + ใบรับรอง | push + pull | OAuth | draft | [→](integrations/moph-immunization-center/) |
| 10 | MOPH Certificate | ออกใบรับรองแพทย์ดิจิทัล (digital signature) | push | OAuth+sig | draft | [→](integrations/moph-certificate/) |
| 11 | MOPH Alert | แจ้งเตือนประชาชน (นัด/ผล/survey) ผ่าน LINE+app | push | OAuth | draft | [→](integrations/moph-alert/) |

> เลข `#` = ลำดับแนะนำในการลงมือ · `thai-id` + `moph-provider-id` + `drug-datacenter` ถอด spec ครบแล้ว (พร้อม implement รอแค่ credential) · `moph-alert` มี API doc พร้อมถอด
> รายละเอียดเต็ม (encryption, version, data_standard) อยู่ใน YAML frontmatter ของ `integrations/<slug>/README.md`

## ชั้น 5 — Clinical Decision Support (ความปลอดภัยด้านยา ณ จุดบริการ)

> เรียกใช้ตอนสั่ง/จ่ายยา — อิง `moph_access_token_idp` จาก Provider ID (ชั้น 1) + ดึงประวัติยาจาก PHR

| # | Integration | หน้าที่ | ทิศทาง | Auth | สถานะ | เอกสาร |
|:--:|---|---|:--:|---|:--:|:--:|
| 12 | Drug Datacenter (ManageAI) | ตรวจ DI / แพ้ยา / med reconcile จากรหัส TMT + PHR (8 endpoint) | pull | apiKey + MOPH-JWT | draft | [→](integrations/drug-datacenter/) |

---

## มาตรฐานรหัส/ข้อมูลกลาง (Terminology — ใช้ร่วมทุก integration)

ไม่ใช่ระบบที่ต้อง "เชื่อม" แต่เป็นชุดรหัสที่ต้องใช้ encode ข้อมูลให้ตรงทุกระบบข้างบน — ดูแลโดย **สมสท. (THIS — this.or.th)** ภายใต้ HSRI

| มาตรฐาน | ใช้กับ | หมายเหตุ |
|---|---|---|
| **HL7 FHIR** | แลกเปลี่ยนข้อมูลหลัก | ใช้แล้วใน IoT Data Hub, Health Link, PHR |
| **ICD-10-TM / ICD-9-CM** | วินิจฉัย / หัตถการ | 43 แฟ้ม + เบิกจ่าย |
| **TMT** (Thai Medicines Terminology) | รหัสยา | SNOMED CT extension |
| **TMLT** (Thai Medical Laboratory Terminology) | รหัส lab | |
| **LOINC** | observation / lab | ใช้แล้วใน IoT Data Hub |
| **SNOMED CT** | semantic | ไทยเป็นสมาชิก ขอ license ฟรีได้ (ม.ค. 2022) |

---

## คำอธิบายคอลัมน์

- **#** — ลำดับแนะนำในการลงมือ (`—` = ทำไปแล้ว/active)
- **หน้าที่** — สรุปสั้นว่า integration นี้ทำอะไร
- **ทิศทาง** — `push` = เราส่งข้อมูลออก, `pull` = เราดึงข้อมูลเข้า, `push + pull` = ทั้งสองทาง
- **Auth** — รูปแบบยืนยันตัวตนที่ปลายทางต้องการ (รายละเอียด/encryption ดูใน README)
- **สถานะ** — `active` (ใช้งานจริง) · `draft` (stub/รอถอด spec/รอ key) · `deprecated` (เลิกใช้)

## วิธีเพิ่มแถวใหม่

ดู [`CLAUDE.md`](CLAUDE.md) หัวข้อ "กติกาเมื่อเพิ่ม integration ใหม่" — ค่าในตารางต้องตรงกับ YAML frontmatter ใน `integrations/<slug>/README.md` แล้ววางแถวไว้ในชั้นที่เหมาะสม
