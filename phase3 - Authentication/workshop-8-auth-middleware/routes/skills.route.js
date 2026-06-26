// ============================================================
// Route: Skills (Workshop 8 - Auth Middleware)
// ป้องกัน POST endpoint ด้วย verifyToken Middleware
// ============================================================

const express = require('express');
const router = express.Router();
const skillsController = require('../controllers/skills.controller');
const verifyToken = require('../middlewares/auth.middleware');

// GET /api/skills/ → ดึงข้อมูลทุกคนเข้าได้ (Public)
router.get('/', skillsController.getSkills);

// ============================================================
// POST /api/skills/ → สร้าง Skill ใหม่ (Protected)
// การใส่ verifyToken ระหว่าง path กับ controller:
//   router.post('/', verifyToken, skillsController.createSkill)
// Express จะรัน verifyToken ก่อน ถ้าผ่านจึงรัน createSkill
// เรียกว่า Route-level Middleware
// ============================================================
router.post('/', verifyToken, skillsController.createSkill);

module.exports = router
