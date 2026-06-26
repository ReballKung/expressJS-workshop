// ============================================================
// Workshop 5: Validation
// เพิ่มการตรวจสอบข้อมูล (Validation) ก่อน Insert ลง Database
// ============================================================

const express = require('express');
const app = express();
const PORT = 8001
const profileRoute = require('./routes/profile.route')
const skillsRoute = require('./routes/skills.route')

app.use((req, res, next) => {
    console.log('req.method', req.method)
    console.log('req.originalUrl', req.originalUrl)
    const dateNow = new Date().toISOString();
    console.log(`[Method : ${req.method}] ถูกเรียกใช้งานที่ [PATH : ${req.originalUrl}] - เวลา [${dateNow}]`);
    next();
})

// ============================================================
// express.json() คือ Built-in Middleware ของ Express
// ทำหน้าที่แปลง Request Body จาก JSON string → JavaScript object
// ต้องเพิ่มบรรทัดนี้ก่อน ไม่เช่นนั้น req.body จะเป็น undefined
// จำเป็นสำหรับ POST / PUT / PATCH ที่ส่งข้อมูลมาใน Body
// ============================================================
app.use(express.json());

app.use('/api/profile', profileRoute);
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
