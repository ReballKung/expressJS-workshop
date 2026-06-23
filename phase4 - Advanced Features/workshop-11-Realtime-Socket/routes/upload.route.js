const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "กรุณาแนบไฟล์รูปภาพมาด้วย" });
        }

        res.status(201).json({
            message: "อัพโหลดไฟล์สำเร็จ!",
            fileName: req.file.filename
        })
    } catch (error) {
        res.status(500).json({ message: "เกิดข้อผิดพลาดในการอัพโหลด" });
    }
});

module.exports = router