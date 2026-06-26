// ============================================================
// Database Configuration
// ตั้งค่าการเชื่อมต่อ MySQL ด้วย mysql2/promise
// ============================================================

// mysql2/promise คือ version ที่รองรับ async/await
// ต่างจาก mysql2 ปกติที่ใช้ callback
const mysql = require('mysql2/promise.js');

// ============================================================
// createPool() สร้าง Connection Pool
// Pool คือการเก็บ Connection หลาย ๆ อันไว้รอใช้
// ดีกว่าสร้าง Connection ใหม่ทุกครั้งที่มี Request เพราะ:
//   - เร็วกว่า (ไม่ต้องรอสร้าง Connection ใหม่)
//   - ประหยัด resource ของ Database Server
// ============================================================
const pool = mysql.createPool({
    host: 'localhost',       // ที่อยู่ของ Database Server
    user: 'root',            // ชื่อผู้ใช้ Database
    password: 'root',        // รหัสผ่าน
    database: 'portfolio_db' // ชื่อ Database ที่จะใช้
});

module.exports = pool;
