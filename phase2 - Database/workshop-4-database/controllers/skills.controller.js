const db = require('../config/db');

const getSkills = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM skills');
        res.json({ data: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล" })
    }
};

module.exports = { getSkills }