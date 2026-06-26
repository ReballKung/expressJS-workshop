// ============================================================
// Middleware: Auth (Workshop 8 - Auth Middleware)
// ตรวจสอบ JWT Token ก่อนอนุญาตให้เข้าถึง Protected Route
// ============================================================

const jwt = require('jsonwebtoken');

// ============================================================
// verifyToken เป็น Middleware Function (req, res, next)
// ทำงานก่อน Controller Handler ถ้า Token ไม่ถูกต้องจะหยุดทันที
// ถ้า Token ผ่านการตรวจสอบ จะเรียก next() เพื่อไปยัง Controller
// ============================================================
const verifyToken = (req, res, next) => {
    // Token ส่งมาใน HTTP Header "Authorization"
    // รูปแบบมาตรฐาน Bearer Token: "Authorization: Bearer <token>"
    const authHeader = req.headers.authorization;

    // ตรวจสอบว่า Header มีอยู่และขึ้นต้นด้วย "Bearer "
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "ไม่พบ Token หรือรูปแบบ Token ไม่ถูกต้อง" });
    }

    // ตัด "Bearer " ออก เหลือแค่ตัว Token
    // "Bearer eyJhbGc..." → split(' ') → ["Bearer", "eyJhbGc..."] → [1]
    const token = authHeader.split(' ')[1];

    try {
        // ============================================================
        // jwt.verify(token, secretKey)
        // ตรวจสอบว่า Token ถูกต้องและยังไม่หมดอายุ
        // คืนค่า payload ที่ถูก decode แล้ว เช่น { userId, username }
        // ถ้าผิดพลาดจะ throw error ทันที (จะถูกดักที่ catch)
        // ============================================================
        const decoded = jwt.verify(token, 'MY_SUPER_SECRET_KEY');

        // ต่อ decoded payload เข้ากับ req.user
        // ทำให้ Controller ที่อยู่ถัดไปเรียกใช้ req.user ได้เลย
        req.user = decoded;

        next();
    } catch (error) {
        // 403 Forbidden = ยืนยันตัวตนแล้ว แต่ไม่มีสิทธิ์เข้าถึง
        return res.status(403).json({ message: "Token ไม่ถูกต้อง หรือหมดอายุแล้ว" });
    }
}

module.exports = verifyToken;
