const fs = require('fs');
const path = require('path');

exports.renderMainPage = (req, res) => {
    console.log('req.session.userId:', req.session.userId);
    const userId = req.session.userId;
    if (!userId) {
        return res.redirect('/login'); // 如果没有登录，重定向到登录页
    }
    res.render('MainPage');
};

exports.renderLibrary = (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
        return res.redirect('/login'); // 如果没有登录，重定向到登录页
    }
    const userFolder = path.join(__dirname, '..', 'public', 'images', 'gen_img', userId); // 生成用户文件夹路径
    console.log('userFolder:', userFolder);


    // 读取用户文件夹中的图片
    fs.readdir(userFolder, (err, files) => {
        if (err) {
            res.status(500).send('Error reading user images');
            return;
        }

        const imageUrls = files.map(file => ({
            url: `./images/gen_img/${userId}/${file}`,
            alt: file
        }));
        const encodedImageUrls = encodeURIComponent(JSON.stringify(imageUrls));
        // console.log(imageUrls.length, 'imageUrls:', imageUrls, 'is array?:', Array.isArray(imageUrls));
        res.render('Library', { userId, imageUrls: encodedImageUrls });
    });
};

exports.renderImageGen = (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
        return res.redirect('/login'); // 如果没有登录，重定向到登录页
    }
    res.render('ImageGen');
};

exports.renderSetting = (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
        return res.redirect('/login'); // 如果没有登录，重定向到登录页
    }
    res.render('Setting');
};

exports.renderUpgradePlan = (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
        return res.redirect('/login'); // 如果没有登录，重定向到登录页
    }
    res.render('UpgradePlan');
};

exports.renderLogin = (req, res) => {
    res.render('login');
};

exports.handleLogin = (req, res) => {
    console.log(req.session);
    const userId = req.body.userId;
    if (userId) {
        // 将 userId 存储到 session 中
        req.session.userId = userId;
        res.redirect('/mainpage'); // 登录后重定向到 mainpage
    } else {
        res.redirect('/login');
    }
};

exports.renderProfile = (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
        return res.redirect('/login'); // 如果没有登录，重定向到登录页
    }
    const userFolder = path.join(__dirname, '..', 'public', 'images', 'gen_img', userId); // 生成用户文件夹路径
    console.log('userFolder:', userFolder);

    // 读取用户文件夹中的图片
    fs.readdir(userFolder, (err, files) => {
        if (err) {
            res.status(500).send('Error reading user images');
            return;
        }

        const imageUrls = files.map(file => ({
            url: `./images/gen_img/${userId}/${file}`,
            alt: file
        }));
        const encodedImageUrls = encodeURIComponent(JSON.stringify(imageUrls));
        const imgLength = imageUrls.length;
        console.log(imageUrls.length, 'imageUrls:', imageUrls, 'is array?:', Array.isArray(imageUrls));

        // 将 imgLength 传递给 EJS 模板
        res.render('profile', { imgLength, userId, imageUrls: encodedImageUrls });
    });
};
