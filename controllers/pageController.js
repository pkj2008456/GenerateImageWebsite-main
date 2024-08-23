const fs = require('fs');

exports.renderMainPage = (req, res) => {
    console.log('req.session.userId:', req.session.userId);
    res.render('MainPage');
};

exports.renderLibrary = (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
        return res.redirect('/login'); // 如果没有登录，重定向到登录页
    }
    const userFolder = `path/to/user_folders/${userId}`;

    // 读取用户文件夹中的图片
    fs.readdir(userFolder, (err, files) => {
        if (err) {
            res.status(500).send('Error reading user images');
            return;
        }

        const imageUrls = files.map(file => `/user_folders/${userId}/${file}`);
        res.render('Library', { userId, imageUrls });
    });
};

exports.renderImageGen = (req, res) => {
    res.render('ImageGen');
};

exports.renderSetting = (req, res) => {
    res.render('Setting');
};

exports.renderUpgradePlan = (req, res) => {
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
    const userFolder = `path/to/user_folders/${userId}`;

    // 读取用户文件夹中的图片
    fs.readdir(userFolder, (err, files) => {
        if (err) {
            res.status(500).send('Error reading user images');
            return;
        }

        const imageUrls = files.map(file => `/user_folders/${userId}/${file}`);
        res.render('profile', { userId, imageUrls });
    });
};
