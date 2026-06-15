---
name: e-Referral (ระบบส่งต่อผู้ป่วย)
slug: moph-ereferral
system: สปสช. (NHSO) + NECTEC
direction: push + pull       # ส่งต่อ/รับ refer
base_url: TBD
auth: TBD
encryption: TLS
data_standard: มาตรฐานข้อมูลส่งต่อ + HIS API
version: TBD
status: draft
source_doc: source/   # TODO: spec e-Referral / รายการ field มาตรฐาน
source_updated: 2024-01-01
contact_apikey: ผ่าน สปสช. / NECTEC
---

# e-Referral (ระบบส่งต่อผู้ป่วย)

ระบบส่งต่อข้อมูลผู้ป่วยข้ามหน่วยบริการ (ใช้งานตั้งแต่ปี 2558) ความร่วมมือ สปสช. + NECTEC — รพ. พัฒนา HIS ให้มีข้อมูลตามรายการมาตรฐานแล้วเชื่อมผ่าน API

> **สถานะ: draft** — ต้องดึง spec รายการ field + API มาวางใน `source/`

- **spec เต็ม:** [`spec.md`](spec.md) (ยังเป็นโครง)
- **changelog:** [`changelog.md`](changelog.md)

## ภาพรวม (Overview)

- ส่งต่อ (refer out) + รับเข้า (refer in) ข้อมูลผู้ป่วยตามรายการมาตรฐาน
- รพ. เชื่อมจาก HIS ผ่าน API

## ข้อควรระวัง / Gotchas / TODO

- [ ] ระบุ endpoint/เจ้าของระบบส่งต่อที่ใช้จริงในเขตสุขภาพของ KKH (อาจมีหลายเจ้า: Thai Refer, e-Referral สปสช.)
- [ ] ดึงรายการ field มาตรฐาน + API doc มาวางใน `source/`
- [ ] เทียบกับ Health Link (ทับซ้อนเรื่องส่งต่อ?)

## แหล่งอ้างอิง

- ระบบข้อมูลและระบบส่งต่อ (E-referral) — https://thainhf.org/en/work/
- แนวทางมะเร็งรักษาทุกที่ (สปสช.) — https://www.nhso.go.th/news/4096
