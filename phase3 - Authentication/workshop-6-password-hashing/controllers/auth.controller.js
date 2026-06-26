// ============================================================
// Controller: Auth (Workshop 6 - Password Hashing)
// ระบบ Register พร้อม Hash รหัสผ่านด้วย bcrypt
// ============================================================

const db = require('../config/db');

// bcrypt คือ library สำหรับ Hash รหัสผ่าน
// ทำไมต้อง Hash? เพราะไม่ควรเก็บรหัสผ่านแบบ plaintext ใน Database
// ถ้า Database รั่ว ผู้โจมตีจะอ่านรหัสผ่านตรง ๆ ไม่ได้
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try {
        // ดึงข้อมูลจาก Request Body (ต้องมี express.json() Middleware)
        const { username, password } = req.body;

        // ตรวจสอบ input เบื้องต้น — ถ้าไม่มีให้ตอบกลับ 400 ทันที
        if (!username || !password) {
            return res.status(400).json({ message: 'กรุณากรอก Username และ Password ให้ครบถ้วน' });
        }

        // ============================================================
        // bcrypt.hash(password, saltRounds)
        //   password   = รหัสผ่านจริง
        //   saltRounds = ความซับซ้อนในการ Hash (ค่ายิ่งมาก ยิ่งปลอดภัย แต่ช้ากว่า)
        //   10 คือค่าที่นิยมใช้ — เหมาะสมระหว่างความปลอดภัยและประสิทธิภาพ
        // bcrypt.hash คืนค่าเป็น string ที่ Hash แล้ว เช่น "$2b$10$abc..."
        // ============================================================
        const hashedPassword = await bcrypt.hash(password, 10);

        // บันทึกลง Database โดยเก็บ hashedPassword แทนรหัสผ่านจริง
        const [result] = await db.query(
            'INSERT INTO users (username, password) VALUES (?,?)',
            [username, hashedPassword]
        );

        res.status(201).json({
            message: 'สมัครสมาชิกสำเร็จ!',
            userId: result.insertId
        });

    } catch (error) {
        // ER_DUP_ENTRY คือ Error code ของ MySQL เมื่อ INSERT ข้อมูลซ้ำกับ UNIQUE field
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: "Username นี้มีคนใช้แล้ว" });
        }

        console.error(error);
        res.status(500).json({ message: "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์" });
    }
};

module.exports = { register };
