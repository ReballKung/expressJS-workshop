// ============================================================
// Route: Upload (Workshop 10 - File Upload)
// รับไฟล์จาก Client และบันทึกลงโฟลเดอร์ uploads/
// ============================================================

const express = require('express');
const router = express.Router();

// multer คือ Middleware สำหรับจัดการ multipart/form-data
// ใช้สำหรับรับไฟล์ที่ Client ส่งมาผ่าน HTML Form หรือ FormData
const multer = require('multer');

// path เป็น built-in module ของ Node.js ใช้จัดการ file path
const path = require('path');

// ============================================================
// multer.diskStorage() กำหนดการบันทึกไฟล์ลงดิสก์
// มี 2 ฟังก์ชันหลัก:
//   destination = กำหนดโฟลเดอร์ที่จะบันทึก
//   filename    = กำหนดชื่อไฟล์ที่จะบันทึก
// callback (cb) รับ 2 argument: (error, value)
//   null = ไม่มี error, ตามด้วยค่าที่ต้องการ
// ============================================================
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // บันทึกไฟล์ไปที่โฟลเดอร์ 'uploads/' (ต้องสร้างโฟลเดอร์นี้ก่อน)
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // ตั้งชื่อไฟล์ใหม่เป็น timestamp + นามสกุลเดิม
        // เช่น 1700000000000.jpg
        // ใช้ Date.now() เพื่อป้องกันชื่อซ้ำกัน
        // path.extname() ดึงนามสกุลออกมา เช่น ".jpg", ".png"
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

// สร้าง multer instance พร้อมกำหนด storage ที่ใช้
const upload = multer({ storage: storage });

// POST /api/upload/
// upload.single('image') คือ Middleware ของ multer
//   'image' = ชื่อ field ใน FormData ที่ Client ส่งมา
// หลังผ่าน multer แล้ว ข้อมูลไฟล์จะอยู่ใน req.file
router.post('/', upload.single('image'), (req, res) => {
    try {
        // ตรวจสอบว่ามีไฟล์ส่งมาจริง (multer ตั้งค่า req.file = undefined ถ้าไม่มีไฟล์)
        if (!req.file) {
            return res.status(400).json({ message: "กรุณาแนบไฟล์รูปภาพมาด้วย" });
        }

        res.status(201).json({
            message: "อัพโหลดไฟล์สำเร็จ!",
            fileName: req.file.filename // ชื่อไฟล์ที่บันทึกจริง (timestamp.ext)
        })
    } catch (error) {
        res.status(500).json({ message: "เกิดข้อผิดพลาดในการอัพโหลด" });
    }
});

module.exports = router
