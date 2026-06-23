const express = require('express');
const app = express();
const PORT = 8001

// lib ด้านความปลอดภัย
const cors = require('cors');
const helmet = require('helmet');

const profileRoute = require('./routes/profile.route');
const skillsRoute = require('./routes/skills.route');
const authRoute = require('./routes/auth.route');
const uploadRoute = require('./routes/upload.route');

app.use(helmet());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware 
app.use((req, res, next) => {
    console.log('req.method', req.method); // บอกชนิด Method
    console.log('req.originalUrl', req.originalUrl); // บอก Path ที่ยิงในปัจจุบัน
    const dateNow = new Date().toISOString();
    console.log(`[Method : ${req.method}] ถูกเรียกใช้งานที่ [PATH : ${req.originalUrl}] - เวลา [${dateNow}]`);
    next();
})

app.use(express.json());

app.use('/api/profile', profileRoute);
app.use('/api/skills', skillsRoute);
app.use('/api/auth', authRoute);
app.use('/api/upload', uploadRoute);

app.use('/uploads', express.static('uploads'));

app.post('/api/hello', (req , res) => {
    res.json({ message: "This is a POST method" });
})

app.get('/api/notfound', (req, res) => {
    res.status(404).json({ message: "ขออภัย ไม่พบหน้าที่คุณค้นหา" });
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});