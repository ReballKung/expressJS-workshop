// ============================================================
// Workshop 11: Realtime Socket.IO
// เพิ่ม WebSocket ด้วย Socket.IO สำหรับการสื่อสารแบบ Realtime
// ============================================================

const express = require('express');
const app = express();
const PORT = 8001

// ============================================================
// ทำไมต้อง http module?
// Express ปกติทำงานบน HTTP Protocol
// Socket.IO ต้องการ HTTP Server เพื่อ Upgrade Connection เป็น WebSocket
// จึงต้อง wrap Express ด้วย http.createServer() ก่อน
// ============================================================

// 1: import http และ Socket.IO
const http = require('http');
const { Server } = require('socket.io');

// 2: นำ http มาครอบ Express เพื่อให้รองรับ WebSocket
// server ตัวนี้จะ listen แทน app
const server = http.createServer(app);

// สร้าง Socket.IO instance และ attach เข้ากับ http server
// cors กำหนด origin ที่อนุญาตให้ connect ผ่าน WebSocket
const io = new Server(server, {
    cors: { origin: 'http://127.0.0.1:5500' }
})

// ============================================================
// 3: กำหนด Socket Event Handlers
// io.on('connection') ทำงานทุกครั้งที่มี Client เชื่อมต่อเข้ามา
// socket คือตัวแทนของ Client แต่ละคน มี socket.id เป็น unique id
// ============================================================
io.on('connection', (socket) => {
    console.log(`🟢 มี User เข้ามาเชื่อมต่อ: ${socket.id}`);

    // socket.on() รับ event ที่ Client ส่งมา
    // 'client_message' คือชื่อ event (กำหนดเองได้)
    socket.on('client_message', (data) => {
        console.log(`📩 ข้อความจาก Client: ${data}`);

        // io.emit() ส่ง event ไปยัง Client ทุกคนที่เชื่อมต่ออยู่ (Broadcast)
        // ถ้าต้องการส่งแค่คนที่ส่งมา ใช้ socket.emit() แทน
        io.emit('server_message', `เซิร์ฟเวอร์บอกว่า: ได้รับคำว่า ${data} แล้วนะ!`);
    });

    // 'disconnect' เป็น Built-in event ของ Socket.IO
    // ทำงานเมื่อ Client ตัดการเชื่อมต่อ
    socket.on('disconnect', () => {
        console.log(`🔴 User ออกจากระบบ: ${socket.id}`);
    })
})

const cors = require('cors');
const helmet = require('helmet');

const profileRoute = require('./routes/profile.route');
const skillsRoute = require('./routes/skills.route');
const authRoute = require('./routes/auth.route');
const uploadRoute = require('./routes/upload.route');

app.use(helmet());
app.use(cors({
    origin: 'http://127.0.0.1:5500',
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
app.use('/api/auth', authRoute);
app.use('/api/upload', uploadRoute);

app.use('/uploads', express.static('uploads'));

app.post('/api/hello', (req , res) => {
    res.json({ message: "This is a POST method" });
})

app.get('/api/notfound', (req, res) => {
    res.status(404).json({ message: "ขออภัย ไม่พบหน้าที่คุณค้นหา" });
})

// ใช้ server.listen() แทน app.listen() เพราะ WebSocket ต้อง listen บน http server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
