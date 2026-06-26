// ============================================================
// Controller: Skills (Workshop 5 - Validation)
// เพิ่ม Zod Schema Validation ก่อน Insert ข้อมูลลง Database
// ============================================================

const db = require('../config/db');

// z คือ object หลักของ Zod library
const { z } = require('zod');

// ============================================================
// Zod Schema คืออะไร?
// ใช้กำหนด "รูปแบบ" ของข้อมูลที่คาดหวัง
// Zod จะตรวจสอบ (validate) ข้อมูลให้อัตโนมัติ พร้อม Error message
// ดีกว่าเขียน if-else เช็คเองทีละฟิลด์
// ============================================================
const skillSchema = z.object({
    // name ต้องเป็น string และมีความยาวอย่างน้อย 2 ตัวอักษร
    name: z.string().min(2, "ชื่อ Skill ต้องมีอย่างน้อย 2 ตัวอักษร")
});

const getSkills = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM skills');
        res.json({ data: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล" })
    }
};

const createSkill = async (req, res) => {
    try {
        // skillSchema.parse() ตรวจสอบข้อมูลจาก req.body
        // ถ้าข้อมูลถูกต้อง จะคืนค่าข้อมูลที่ผ่านการ parse แล้ว
        // ถ้าข้อมูลผิด จะ throw ZodError ทันที (จะถูกดักที่ catch)
        const validateData = skillSchema.parse(req.body);

        // Parameterized Query: ใช้ ? แทนค่าจริง และส่ง array ตามหลัง
        // ป้องกัน SQL Injection — ไม่ควร concat string ตรง ๆ ใน SQL
        const [result] = await db.query('INSERT INTO skills (name) VALUES (?)', [validateData.name]);

        // 201 Created = สร้าง Resource ใหม่สำเร็จ
        res.status(201).json({
            message: "เพิ่ม Skill สำเร็จ",
            insertId: result.insertId // ID ของแถวที่เพิ่งสร้าง
        });

    } catch (error) {
        // ตรวจสอบว่า Error มาจาก Zod validation หรือไม่
        if (error instanceof z.ZodError) {
            // 400 Bad Request = Client ส่งข้อมูลผิดรูปแบบ
            return res.status(400).json({
                message: "ข้อมูลไม่ถูกต้อง",
                errors: error.errors // รายละเอียดว่าฟิลด์ไหนผิด
            })
        }
    }
}

module.exports = { getSkills, createSkill };
