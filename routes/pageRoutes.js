// routes/pageRoutes.js
const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

// 渲染主页
router.get('/mainpage', pageController.renderMainPage);

// 渲染图书馆页面
router.get('/library', pageController.renderLibrary);

// 渲染图像生成页面
router.get('/imagegen', pageController.renderImageGen);

// 渲染个人资料页面
router.get('/profile', pageController.renderProfile);

// 渲染设置页面
router.get('/setting', pageController.renderSetting);

// 渲染升级计划页面
router.get('/upgradeplan', pageController.renderUpgradePlan);

router.get('/', pageController.renderMainPage);

module.exports = router;
