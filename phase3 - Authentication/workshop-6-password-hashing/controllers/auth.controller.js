const db = require('../config/db');
const bcrypt = require('bcrypt');

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

module.exports = { register };