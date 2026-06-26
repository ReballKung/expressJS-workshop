// ============================================================
// Workshop 1: Express เบื้องต้น
// เรียนรู้การสร้าง Web Server ง่าย ๆ ด้วย Express.js
// ============================================================

// require() คือการ import package มาใช้งาน
// express เป็น Framework สำหรับสร้าง Web Server บน Node.js
const express = require('express');

// สร้าง instance ของ Express application
// app คือตัวแทนของ Server ทั้งหมด ใช้สำหรับกำหนด Route และ Middleware
const app = express();

// กำหนด Port ที่ Server จะรับฟัง Request
// Port 8001 หมายถึง Server รอรับที่ http://localhost:8001
const PORT = 8001

// ============================================================
// Route: GET /api/profile
// HTTP GET ใช้สำหรับ "ดึงข้อมูล" (Read)
// req = request (ข้อมูลที่ Client ส่งมา)
// res = response (ข้อมูลที่ Server จะตอบกลับ)
// ============================================================
app.get('/api/profile', (req, res) => {
    const name = 'Sukrit Saeliao';
    const role = 'FullStack'
    const skills = ["JavaScript", "TypeScript", "Vue", "Nuxt", "React", "PHP", "C", "C#", "Blazor", "HTML", "CSS", "TailwindCSS", "Bootstrap"];

    // res.json() ส่งข้อมูลกลับในรูป JSON พร้อม Content-Type: application/json อัตโนมัติ
    res.json({
         name,
         role,
         skills
    })
})

// ============================================================
// Route: POST /api/hello
// HTTP POST ใช้สำหรับ "ส่งข้อมูลใหม่" (Create)
// ============================================================
app.post('/api/hello', (req , res) => {
    res.json({ message: "This is a POST method" });
})

// ============================================================
// เริ่มต้น Server ให้รับฟัง Request ที่ Port ที่กำหนด
// callback function ใน listen() จะทำงานเมื่อ Server พร้อมแล้ว
// ============================================================
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
