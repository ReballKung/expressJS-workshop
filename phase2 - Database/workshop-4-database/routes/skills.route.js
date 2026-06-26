// ============================================================
// Route: Skills
// กำหนด Route สำหรับ Skills API
// ============================================================

const express = require('express');
const router = express.Router();
const skillsController = require('../controllers/skills.controller');

// GET /api/skills/ → ดึงข้อมูล Skills ทั้งหมดจาก Database
router.get('/', skillsController.getSkills);

module.exports = router
