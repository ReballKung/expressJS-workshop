// ============================================================
// Workshop 4: Database
// เพิ่มการเชื่อมต่อ MySQL Database เข้ามาใน API
// ============================================================

const express = require('express');
const app = express();
const PORT = 8001
const profileRoute = require('./routes/profile.route')

// import Route ของ skills ที่ดึงข้อมูลจาก Database
const skillsRoute = require('./routes/skills.route')

app.use((req, res, next) => {
    console.log('req.method', req.method)
    console.log('req.originalUrl', req.originalUrl)
    const dateNow = new Date().toISOString();
    console.log(`[Method : ${req.method}] ถูกเรียกใช้งานที่ [PATH : ${req.originalUrl}] - เวลา [${dateNow}]`);
    next();
})

app.use('/api/profile', profileRoute);

// ลงทะเบียน skillsRoute ที่ base path /api/skills
// ทุก Request ที่ขึ้นต้นด้วย /api/skills จะถูกส่งไปที่ skillsRoute
app.use('/api/skills' , skillsRoute);

app.post('/api/hello', (req , res) => {
    res.json({ message: "This is a POST method" });
})

app.get('/api/notfound', (req, res) => {
    res.status(404).json({ message: "ขออภัย ไม่พบหน้าที่คุณค้นหา" });
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
