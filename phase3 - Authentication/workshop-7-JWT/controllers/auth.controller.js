// ============================================================
// Controller: Auth (Workshop 7 - JWT)
// เพิ่ม Login และออก JWT Token หลังจาก Login สำเร็จ
// ============================================================

const db = require('../config/db');
const bcrypt = require('bcrypt');

// jsonwebtoken คือ library สำหรับสร้างและตรวจสอบ JWT
// JWT = JSON Web Token — ใช้แทนการเก็บ Session บน Server
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'กรุณากรอก Username และ Password ให้ครบถ้วน' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.query(
            'INSERT INTO users (username, password) VALUES (?,?)',
            [username, hashedPassword]
        );

        res.status(201).json({
            message: 'สมัครสมาชิกสำเร็จ!',
            userId: result.insertId
        });

    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: "Username นี้มีคนใช้แล้ว" });
        }
        console.error(error);
        res.status(500).json({ message: "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์" });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // ค้นหา user จาก Database ด้วย username
        // WHERE username = ? ป้องกัน SQL Injection ด้วย Parameterized Query
        const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

        // users คือ array — ถ้าไม่พบ user จะเป็น array ว่าง
        if (users.length === 0) {
            // 401 Unauthorized = ยืนยันตัวตนไม่สำเร็จ
            return res.status(401).json({ message: "ไม่พบ Username นี้ในระบบ" });
        }

        const user = users[0];

        // ============================================================
        // bcrypt.compare(plainPassword, hashedPassword)
        // เปรียบเทียบรหัสผ่านที่ผู้ใช้กรอก กับ Hash ที่เก็บใน Database
        // คืนค่า true/false — ไม่ต้อง Hash ใหม่เพื่อเปรียบเทียบ
        // ============================================================
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "รหัสผ่านไม่ถูกต้อง" });
        }

        // ============================================================
        // jwt.sign(payload, secretKey, options)
        //   payload   = ข้อมูลที่จะเก็บใน Token (ไม่ควรใส่ข้อมูลสำคัญ เช่น password)
        //   secretKey = กุญแจลับสำหรับเซ็น Token — ควรเก็บใน .env ไม่ใช่ hardcode
        //   expiresIn = อายุของ Token ('1h' = 1 ชั่วโมง, '7d' = 7 วัน)
        // ============================================================
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            'MY_SUPER_SECRET_KEY',
            { expiresIn: '1h' }
        );

        res.json({
            message: "เข้าสู่ระบบสำเร็จ",
            token: token // Client ต้องเก็บ Token นี้ไว้ส่งกลับมาในทุก Request ที่ต้องการ Auth
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์" });
    }
}

module.exports = { register , login };
