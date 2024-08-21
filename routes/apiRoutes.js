const express = require('express');
const router = express.Router();
const pageController = require('../controllers/apiController');

router.post('/generate-image', pageController.generateImage);

module.exports = router;