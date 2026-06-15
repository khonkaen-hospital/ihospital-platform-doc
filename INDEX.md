# INDEX — Integration Catalog

catalog กลางของทุก integration ในแพลตฟอร์ม **ihospital-platform**
คลิกคอลัมน์ "เอกสาร" เพื่อเข้าไปยังโฟลเดอร์ของ integration นั้น

| Integration | ระบบ/เจ้าของ | ทิศทาง | Auth | Encryption | Version | สถานะ | เอกสาร |
|---|---|---|---|---|---|---|---|
| MOPH Health IoT Data Hub | กระทรวงสาธารณสุข (MOPH) | push + pull | Bearer token | AES-256-GCM | V1.10 | active | [→](integrations/moph-iot-data-hub/) |

---

## คำอธิบายคอลัมน์

- **ทิศทาง** — `push` = เราส่งข้อมูลออก, `pull` = เราดึงข้อมูลเข้า, `push + pull` = ทั้งสองทาง
- **Auth** — รูปแบบการยืนยันตัวตนที่ปลายทางต้องการ
- **Encryption** — การเข้ารหัส payload (ถ้ามี) นอกเหนือจาก TLS
- **สถานะ** — `active` (ใช้งานจริง) · `draft` (กำลังพัฒนา/รอ key) · `deprecated` (เลิกใช้)

## วิธีเพิ่มแถวใหม่

ดู [`CLAUDE.md`](CLAUDE.md) หัวข้อ "กติกาเมื่อเพิ่ม integration ใหม่" — ค่าในตารางนี้ต้องตรงกับ YAML frontmatter ใน `integrations/<slug>/README.md`
