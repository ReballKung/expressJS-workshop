// ============================================================
// Route: Auth (Workshop 7 - JWT)
// เพิ่ม POST /login สำหรับ Login และรับ JWT Token
// ============================================================

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// POST /api/auth/register → สมัครสมาชิก
router.post('/register', authController.register);

// POST /api/auth/login → เข้าสู่ระบบ และรับ JWT Token กลับมา
router.post('/login', authController.login);

module.exports = router;
