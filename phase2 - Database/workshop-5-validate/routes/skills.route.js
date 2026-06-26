// ============================================================
// Route: Skills (Workshop 5 - Validation)
// เพิ่ม POST endpoint สำหรับสร้าง Skill ใหม่
// ============================================================

const express = require('express');
const router = express.Router();
const skillsController = require('../controllers/skills.controller');

// GET /api/skills/ → ดึงข้อมูล Skills ทั้งหมด
router.get('/', skillsController.getSkills);

// POST /api/skills/ → สร้าง Skill ใหม่ (พร้อม Validation)
router.post('/', skillsController.createSkill);

module.exports = router
