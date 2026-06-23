const express = require('express');
const router = express.Router();
const skillsController = require('../controllers/skills.controller');
const verifyToken = require('../middlewares/auth.middleware');

router.get('/', skillsController.getSkills);
router.post('/', verifyToken, skillsController.createSkill);

module.exports = router