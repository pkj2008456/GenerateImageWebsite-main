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

router.get('/', pageController.renderLogin);

// 渲染升级计划页面
router.get('/upgradeplan', pageController.renderUpgradePlan);

// 登录页面和处理登录
router.get('/login', pageController.renderLogin);
router.post('/login', pageController.handleLogin);

module.exports = router;
