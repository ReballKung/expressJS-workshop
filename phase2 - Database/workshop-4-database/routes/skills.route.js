const express = require('express');
const router = express.Router();
const skillsController = require('../controllers/skills.controller');

router.get('/', skillsController.getSkills);

module.exports = router