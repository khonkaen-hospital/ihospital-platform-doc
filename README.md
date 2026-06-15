# ihospital-platform-doc

คลังเอกสารการเชื่อมต่อ (integration documentation) ที่ใช้ร่วมกันของแพลตฟอร์ม **ihospital-platform** — KKH (โรงพยาบาลขอนแก่น)

repo นี้รวบรวม API spec / เอกสารการเชื่อมต่อของระบบภายนอกที่แพลตฟอร์มต้องเชื่อมข้อมูลด้วย แล้วสรุปเป็นรูปแบบมาตรฐานที่ทั้งนักพัฒนาและ AI agent (Claude) หยิบไปใช้ได้ทันที

## เริ่มที่ไหน

- **[INDEX.md](INDEX.md)** — catalog ของทุก integration
- **[CLAUDE.md](CLAUDE.md)** — กติกา/โครงสร้าง repo สำหรับ AI agent และผู้ดูแล

## Integrations ปัจจุบัน

| Integration | สถานะ | เอกสาร |
|---|---|---|
| MOPH Health IoT Data Hub | active | [integrations/moph-iot-data-hub/](integrations/moph-iot-data-hub/) |

## โครงสร้าง

```
INDEX.md                          catalog กลาง
CLAUDE.md                         คู่มือสำหรับ AI agent / ผู้ดูแล repo
integrations/<slug>/              เอกสาร 1 integration ต่อ 1 โฟลเดอร์
├── README.md                       สรุป + metadata (frontmatter)
├── spec.md                         spec เต็ม
├── changelog.md                    revision history
├── source/                         เอกสารต้นฉบับ
└── examples/                       โค้ดตัวอย่าง
templates/integration-template/   แม่แบบสำหรับเพิ่ม integration ใหม่
```

## วิธี contribute

1. ก๊อป `templates/integration-template/` → `integrations/<slug>/`
2. วางต้นฉบับใน `source/`, ถอดเป็น `spec.md`, กรอก frontmatter ใน `README.md`
3. เพิ่มแถวใน `INDEX.md`

รายละเอียดเต็มอยู่ใน [CLAUDE.md](CLAUDE.md)

## ขอบเขต / ความปลอดภัย

- repo นี้เก็บ **เอกสารอ้างอิง** เท่านั้น — ไม่เก็บ API key / token / credential จริง
- credential จริงอยู่ใน secret store ของแต่ละ environment
