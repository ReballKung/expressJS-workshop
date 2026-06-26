// ============================================================
// Route: Auth (Workshop 6 - Password Hashing)
// ============================================================

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// POST /api/auth/register → สมัครสมาชิก (รับ username, password)
router.post('/register', authController.register);

module.exports = router;
