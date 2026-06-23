const db = require('../config/db');
const bcrypt = require('bcrypt');
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

        const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

        if (users.length === 0) {
            return res.status(401).json({ message: "ไม่พบ Username นี้ในระบบ" });
        }

        const user = users[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "รหัสผ่านไม่ถูกต้อง" });
        }

        const token = jwt.sign(
            { userId: user.id, username: user.username },
            'MY_SUPER_SECRET_KEY',
            { expiresIn: '1h' }
        );

        res.json({
            message: "เข้าสู่ระบบสำเร็จ",
            token: token
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์" });
    }
}

module.exports = { register , login };