# INDEX — Integration Catalog

catalog กลางของทุก integration ในแพลตฟอร์ม **ihospital-platform**
คลิกคอลัมน์ "เอกสาร" เพื่อเข้าไปยังโฟลเดอร์ของ integration นั้น

| Integration | ระบบ/เจ้าของ | ทิศทาง | Auth | Encryption | Version | สถานะ | เอกสาร |
|---|---|---|---|---|---|---|---|
| MOPH Provider ID / Health ID | BDH (สป.สธ.) | pull | OAuth2 | none | — | draft | [→](integrations/moph-provider-id/) |
| HDC — 43 แฟ้ม (Standard Data Set) | กองยุทธศาสตร์ฯ สป.สธ. | push | credential หน่วยบริการ | none | — | draft | [→](integrations/moph-hdc-43files/) |
| MOPH Financial Data Hub (FDH) | สป.สธ. | push | OAuth (Provider ID) | TLS (ISO 27001/27799) | — | draft | [→](integrations/moph-fdh/) |
| Health Link (HIE) | BDI + NT (MDES/MOPH) | push + pull | consent/OAuth | pseudonymization | — | draft | [→](integrations/moph-health-link/) |
| e-Referral (ระบบส่งต่อ) | สปสช. + NECTEC | push + pull | TBD | TLS | — | draft | [→](integrations/moph-ereferral/) |
| Cancer Anywhere | สถาบันมะเร็งแห่งชาติ | push + pull | QR + Token | TLS | — | draft | [→](integrations/moph-cancer-anywhere/) |
| MOPH PHR / H4U (สมุดสุขภาพประชาชน) | BDH · หมอพร้อม | push | OAuth (Provider ID) | TLS | — | draft | [→](integrations/moph-phr-h4u/) |
| MOPH Immunization Center (วัคซีน) | BDH · หมอพร้อม | push + pull | OAuth (Provider ID) | TLS | — | draft | [→](integrations/moph-immunization-center/) |
| MOPH Certificate (ใบรับรองแพทย์) | BDH · หมอพร้อม | push | OAuth + digital signature | TLS + signature | — | draft | [→](integrations/moph-certificate/) |
| MOPH Alert (แจ้งเตือนประชาชน) | BDH · หมอพร้อม | push | OAuth (Provider ID) | TLS | 2024-08 | draft | [→](integrations/moph-alert/) |
| MOPH Health IoT Data Hub | กระทรวงสาธารณสุข (MOPH) | push + pull | Bearer token | AES-256-GCM | V1.10 | active | [→](integrations/moph-iot-data-hub/) |

> **ลำดับแนะนำในการลงมือ:** `moph-provider-id` (auth กลาง ทำก่อน) → `moph-hdc-43files` → `moph-fdh` → ที่เหลือ
> ทุกตัวที่ status `draft` ยังเป็น **stub** — ต้องดึงเอกสารต้นฉบับมาวางใน `source/` แล้วถอดเป็น `spec.md` ตามกติกาใน [`CLAUDE.md`](CLAUDE.md)

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

- **ทิศทาง** — `push` = เราส่งข้อมูลออก, `pull` = เราดึงข้อมูลเข้า, `push + pull` = ทั้งสองทาง
- **Auth** — รูปแบบการยืนยันตัวตนที่ปลายทางต้องการ
- **Encryption** — การเข้ารหัส payload (ถ้ามี) นอกเหนือจาก TLS
- **สถานะ** — `active` (ใช้งานจริง) · `draft` (กำลังพัฒนา/รอ key) · `deprecated` (เลิกใช้)

## วิธีเพิ่มแถวใหม่

ดู [`CLAUDE.md`](CLAUDE.md) หัวข้อ "กติกาเมื่อเพิ่ม integration ใหม่" — ค่าในตารางนี้ต้องตรงกับ YAML frontmatter ใน `integrations/<slug>/README.md`
