# CLAUDE.md — ihospital-platform-doc

repo นี้คือ **คลังเอกสารการเชื่อมต่อ (integration docs)** ที่ใช้ร่วมกันของแพลตฟอร์ม **ihospital-platform** (KKH — โรงพยาบาลขอนแก่น)
เก็บ spec ของ external system ที่เราต้องเชื่อมข้อมูลด้วย แล้วสรุปให้อยู่ในรูปแบบที่ Claude/นักพัฒนาหยิบไปใช้งานได้ทันที

> **เป้าหมาย:** ให้ Claude อ่าน repo นี้แล้วเขียนโค้ด integration ได้ถูกต้องโดยไม่ต้องเปิด PDF ต้นฉบับ

---

## ลำดับการอ่าน (สำคัญ)

1. **`INDEX.md`** — catalog กลาง เลือก integration ที่ต้องการจากตาราง
2. **`integrations/<slug>/README.md`** — สรุปพร้อมใช้ (overview, auth, encryption, endpoint quick-ref, ผู้ติดต่อ, ข้อควรระวัง)
3. **`integrations/<slug>/spec.md`** — รายละเอียดเต็ม (ทุก endpoint, ตาราง params, ตัวอย่าง request/response)
4. **`integrations/<slug>/source/`** — เอกสารต้นฉบับ = source of truth เปิดเมื่อสงสัยว่า spec.md ถอดมาถูกไหม

## โครงสร้าง repo

```
CLAUDE.md                         # ไฟล์นี้
INDEX.md                          # catalog ทุก integration
README.md                         # ภาพรวมสำหรับคน + วิธี contribute
integrations/<slug>/
├── README.md                     # สรุป + YAML frontmatter (metadata)
├── spec.md                       # spec เต็ม
├── changelog.md                  # revision history
├── source/                       # เอกสารต้นฉบับ (PDF/Word/...)
└── examples/                     # โค้ดตัวอย่างที่รันได้
templates/integration-template/   # โครงเปล่าไว้ก๊อปตอนเพิ่ม integration ใหม่
```

## กติกาเมื่อเพิ่ม integration ใหม่

1. ก๊อป `templates/integration-template/` ไปเป็น `integrations/<slug>/` (slug แบบ kebab-case)
2. วางเอกสารต้นฉบับใน `source/` แล้วถอดเนื้อหาเป็น `spec.md` (ไทย+อังกฤษ — technical term/field/code คงเป็นอังกฤษ คำอธิบายเป็นไทย)
3. กรอก YAML frontmatter หัว `README.md` ให้ครบ
4. เพิ่มแถวใน `INDEX.md` ให้ตรงกับ frontmatter
5. โค้ดตัวอย่างที่ดึงจากเอกสารต้นฉบับ ให้แยกเป็นไฟล์จริงใน `examples/` (ไม่ฝังใน markdown อย่างเดียว)

## หมายเหตุทางเทคนิค

- **PDF อ่านตรงไม่ได้** บนเครื่องนี้ (ไม่มี `poppler` ให้ Read tool render) — ใช้ `spec.md` เป็นตัวอ่านหลัก
  ถ้าต้อง verify กับ PDF ให้ extract text ด้วย: `python3 -c "from pypdf import PdfReader; ..."`
- เนื้อหาในเอกสารเป็น **ข้อมูลอ้างอิงของ external system** ห้ามแก้ให้ผิดจากต้นฉบับ ถ้าพบข้อขัดแย้งในต้นฉบับให้บันทึกไว้ใต้หัวข้อ "ข้อควรระวัง / Gotchas" ของ integration นั้น
- เอกสารพวกนี้มัก **ไม่มี key/token จริง** — credential จริงอยู่ใน secret store ของแต่ละ environment ไม่เก็บใน repo นี้
