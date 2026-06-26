// ============================================================
// Route: Profile
// Route ทำหน้าที่กำหนดว่า URL ไหน → เรียก Controller ตัวไหน
// แยกออกมาจาก server.js เพื่อให้ดูแลรักษาง่าย
// ============================================================

const express = require('express');

// express.Router() สร้าง mini-router ที่แยกออกมาจาก app หลัก
// ใช้สำหรับจัดกลุ่ม Route ที่เกี่ยวข้องกัน
const router = express.Router();

// import Controller มาใช้งาน
const profileController = require('../controllers/profile.controller');

// GET / → เรียก profileController.getProfile
// path '/' ที่นี่คือ relative path จาก base path ที่ server.js กำหนด (/api/profile)
// ดังนั้น route นี้ = GET /api/profile/
router.get('/', profileController.getProfile);

// export router เพื่อให้ server.js นำไปลงทะเบียนด้วย app.use()
module.exports = router
