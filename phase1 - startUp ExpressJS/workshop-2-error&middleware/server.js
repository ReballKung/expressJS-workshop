// ============================================================
// Workshop 2: Middleware & Error Handling
// เรียนรู้เรื่อง Middleware และการจัดการ Error
// ============================================================

const express = require('express');
const app = express();
const PORT = 8001

// ============================================================
// Middleware คืออะไร?
// คือฟังก์ชันที่ทำงาน "ระหว่างกลาง" ก่อนที่ Request จะถึง Route Handler
// รับ 3 parameter: req, res, next
//   - req  = ข้อมูล Request จาก Client
//   - res  = ออบเจกต์สำหรับส่ง Response
//   - next = ฟังก์ชันเพื่อส่งต่อไปยัง Middleware หรือ Route ถัดไป
//
// app.use() โดยไม่ระบุ path = ใช้กับทุก Route
// ============================================================
app.use((req, res, next) => {
    console.log('req.method', req.method)           // บอกชนิด Method
    console.log('req.originalUrl', req.originalUrl) // บอก Path ที่ยิงในปัจจุบัน
    const dateNow = new Date().toISOString();
    console.log(`[Method : ${req.method}] ถูกเรียกใช้งานที่ [PATH : ${req.originalUrl}] - เวลา [${dateNow}]`);

    // ต้องเรียก next() เสมอ ไม่เช่นนั้น Request จะค้างและไม่ได้รับ Response
    next();
})

app.get('/api/profile', (req, res) => {
    const name = 'Sukrit Saeliao';
    const role = 'FullStack'
    const skills = ["JavaScript", "TypeScript", "Vue", "Nuxt", "React", "PHP", "C", "C#", "Blazor", "HTML", "CSS", "TailwindCSS", "Bootstrap"];

    res.json({
         name,
         role,
         skills
    })
})

app.post('/api/hello', (req , res) => {
    res.json({ message: "This is a POST method" });
})

// ============================================================
// Route สำหรับสาธิต HTTP 404 Not Found
// res.status(404) กำหนด HTTP Status Code ก่อนส่ง Response
// Status Code บอก Client ว่าผลลัพธ์เป็นอย่างไร:
//   2xx = สำเร็จ  (200 OK, 201 Created)
//   4xx = Client ผิดพลาด  (400 Bad Request, 401 Unauthorized, 404 Not Found)
//   5xx = Server ผิดพลาด  (500 Internal Server Error)
// ============================================================
app.get('/api/notfound', (req, res) => {
    res.status(404).json({ message: "ขออภัย ไม่พบหน้าที่คุณค้นหา" });
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
