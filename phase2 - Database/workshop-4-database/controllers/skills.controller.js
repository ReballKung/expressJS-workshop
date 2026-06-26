// ============================================================
// Controller: Skills (Workshop 4 - Database)
// ดึงข้อมูล Skills จาก MySQL Database
// ============================================================

// import connection pool จาก config/db.js
const db = require('../config/db');

// ============================================================
// async/await คืออะไร?
// การเชื่อมต่อ Database ใช้เวลา (I/O operation)
// async/await ทำให้เขียนโค้ด asynchronous แบบ synchronous
// แทนที่จะใช้ callback ที่ซ้อนกันหลายชั้น
//
// try/catch ใช้ดักจับ Error ที่อาจเกิดขึ้น เช่น Database ล่ม
// ============================================================
const getSkills = async (req, res) => {
    try {
        // db.query() ส่ง SQL Query ไปยัง Database
        // คืนค่าเป็น array [rows, fields]
        // rows = ข้อมูลที่ได้จาก Query (array of objects)
        // fields = ข้อมูลของ column (ปกติไม่ค่อยใช้)
        // ใช้ destructuring [rows] เพื่อดึงแค่ rows มาใช้
        const [rows] = await db.query('SELECT * FROM skills');
        res.json({ data: rows });
    } catch (error) {
        console.error(error);
        // 500 Internal Server Error = เกิดข้อผิดพลาดฝั่ง Server
        res.status(500).json({ message: "เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล" })
    }
};

module.exports = { getSkills }
