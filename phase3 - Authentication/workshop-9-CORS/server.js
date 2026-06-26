// ============================================================
// Workshop 9: CORS & Security Headers
// เพิ่ม CORS และ Helmet เพื่อความปลอดภัยของ API
// ============================================================

const express = require('express');
const app = express();
const PORT = 8001

// lib ด้านความปลอดภัย
const cors = require('cors');
const helmet = require('helmet');

const profileRoute = require('./routes/profile.route');
const skillsRoute = require('./routes/skills.route');
const authRoute = require('./routes/auth.route');

// ============================================================
// helmet() เพิ่ม HTTP Security Headers อัตโนมัติ เช่น:
//   X-Content-Type-Options    = ป้องกัน MIME type sniffing
//   X-Frame-Options           = ป้องกัน Clickjacking
//   Strict-Transport-Security = บังคับใช้ HTTPS
// เรียก app.use(helmet()) ก่อนทุก Middleware อื่น ๆ
// ============================================================
app.use(helmet());

// ============================================================
// CORS = Cross-Origin Resource Sharing
// Browser จะบล็อก Request ที่มาจาก Origin ต่างกันโดยปริยาย
// เช่น Frontend ที่ localhost:3000 จะเรียก API ที่ localhost:8001 ไม่ได้
// ต้องกำหนด CORS ให้ Server อนุญาต Origin ที่ต้องการ
//
// origin        = Frontend URL ที่อนุญาต (ควรใส่แค่ที่ต้องการ ไม่ใช่ '*' ใน production)
// methods       = HTTP Methods ที่อนุญาต
// allowedHeaders= Headers ที่ Client ส่งมาได้ (Authorization สำคัญสำหรับ JWT)
// ============================================================
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use((req, res, next) => {
    console.log('req.method', req.method);
    console.log('req.originalUrl', req.originalUrl);
    const dateNow = new Date().toISOString();
    console.log(`[Method : ${req.method}] ถูกเรียกใช้งานที่ [PATH : ${req.originalUrl}] - เวลา [${dateNow}]`);
    next();
})

app.use(express.json());

app.use('/api/profile', profileRoute);
app.use('/api/skills', skillsRoute);
app.use('/api/auth' , authRoute)

app.post('/api/hello', (req , res) => {
    res.json({ message: "This is a POST method" });
})

app.get('/api/notfound', (req, res) => {
    res.status(404).json({ message: "ขออภัย ไม่พบหน้าที่คุณค้นหา" });
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
