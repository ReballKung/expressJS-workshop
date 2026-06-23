const db = require('../config/db');
const { z } = require('zod');

const skillSchema = z.object({
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
        const validateData = skillSchema.parse(req.body);

        const [result] = await db.query('INSERT INTO skills (name) VALUES (?)', [validateData.name]);

        res.status(201).json({
            message: "เพิ่ม Skill สำเร็จ",
            insertId: result.insertId
        });


    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                message: "ข้อมูลไม่ถูกต้อง",
                errors: error.errors
            })
        }
    }
}

module.exports = { getSkills, createSkill };