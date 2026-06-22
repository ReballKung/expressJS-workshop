const express = require('express');
const app = express();
const PORT = 8001
const profileRoute = require('./routes/profile.route')

// Middleware 
app.use((req, res, next) => {
    console.log('req.method', req.method) // บอกชนิด Method
    console.log('req.originalUrl', req.originalUrl) // บอก Path ที่ยิงในปัจจุบัน
    const dateNow = new Date().toISOString();
    console.log(`[Method : ${req.method}] ถูกเรียกใช้งานที่ [PATH : ${req.originalUrl}] - เวลา [${dateNow}]`);
    next();
})

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