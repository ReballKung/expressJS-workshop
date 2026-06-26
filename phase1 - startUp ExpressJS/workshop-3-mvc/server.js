// ============================================================
// Workshop 3: MVC Pattern
// MVC = Model - View - Controller
// แยกโค้ดออกเป็นส่วน ๆ เพื่อให้ดูแลรักษาง่ายขึ้น
//   Model      = จัดการข้อมูล (database, business logic)
//   View       = แสดงผล (ใน API ไม่มี View แต่คือ JSON ที่ส่งกลับ)
//   Controller = รับ Request และเรียก Model แล้วส่ง Response
// ============================================================

const express = require('express');
const app = express();
const PORT = 8001

// import Route จากไฟล์แยก แทนที่จะเขียน Route ทั้งหมดในไฟล์เดียว
// ทำให้ server.js สะอาดขึ้น และแต่ละ Route จัดการตัวเองได้
const profileRoute = require('./routes/profile.route')

// Middleware สำหรับ Logging ทุก Request
app.use((req, res, next) => {
    console.log('req.method', req.method)
    console.log('req.originalUrl', req.originalUrl)
    const dateNow = new Date().toISOString();
    console.log(`[Method : ${req.method}] ถูกเรียกใช้งานที่ [PATH : ${req.originalUrl}] - เวลา [${dateNow}]`);
    next();
})

// ============================================================
// app.use('/api/profile', profileRoute)
// ลงทะเบียน Router โดยกำหนด base path = '/api/profile'
// ทุก Route ใน profileRoute จะถูก prefix ด้วย '/api/profile'
// เช่น router.get('/') ใน profileRoute จะกลายเป็น GET /api/profile/
// ============================================================
app.use('/api/profile' , profileRoute)

app.post('/api/hello', (req , res) => {
    res.json({ message: "This is a POST method" });
})

app.get('/api/notfound', (req, res) => {
    res.status(404).json({ message: "ขออภัย ไม่พบหน้าที่คุณค้นหา" });
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
