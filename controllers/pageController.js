const fs = require('fs');
const path = require('path');


exports.renderMainPage = (req, res) => {
    console.log('req.session.userId:', req.session.userId);
    const userId = req.session.userId;
    if (!userId) {
        return res.redirect('/login');
    } 
    res.render('MainPage');
};

exports.renderLibrary = (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
        return res.redirect('/login');
    }
    const userFolder = path.join(__dirname, '..', 'public', 'images', 'gen_img', userId); // 生成用户文件夹路径
    console.log('userFolder:', userFolder);


    fs.readdir(userFolder, (err, files) => {
        if (err) {
            res.status(500).send('Error reading user images');
            return;
        }


        const filePaths = files.map(file => path.join(userFolder, file));
        

        filePaths.sort((a, b) => {
            return fs.statSync(b).mtime - fs.statSync(a).mtime; // 按修改时间降序排序
        });


        const imageUrls = filePaths.map(filePath => ({
            url: `./images/gen_img/${userId}/${path.basename(filePath)}`,
            alt: path.basename(filePath)
        }));

        const encodedImageUrls = encodeURIComponent(JSON.stringify(imageUrls));
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

exports.renderDigitalHuman = (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
        return res.redirect('/login'); // 如果没有登录，重定向到登录页
    }
    res.render('digitalHuman');
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
        
        req.session.userId = userId;
        res.redirect('/mainpage'); 
    } else {
        res.redirect('/login');
    }
};

exports.renderProfile = (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
        return res.redirect('/login');
    }
    const userFolder = path.join(__dirname, '..', 'public', 'images', 'gen_img', userId); // 生成用户文件夹路径
    console.log('userFolder:', userFolder);


    fs.readdir(userFolder, (err, files) => {
        if (err) {
            res.status(500).send('Error reading user images');
            return;
        }

        const filePaths = files.map(file => path.join(userFolder, file));
        
        filePaths.sort((a, b) => {
            return fs.statSync(b).mtime - fs.statSync(a).mtime; // 按修改时间降序排序
        });

        const imageUrls = filePaths.map(filePath => ({
            url: `./images/gen_img/${userId}/${path.basename(filePath)}`,
            alt: path.basename(filePath)
        }));

        const encodedImageUrls = encodeURIComponent(JSON.stringify(imageUrls));
        const imgLength = imageUrls.length;
        console.log(imgLength, 'imageUrls:', imageUrls, 'is array?:', Array.isArray(imageUrls));

        res.render('profile', { imgLength, userId, imageUrls: encodedImageUrls });
    });
};



// 處理取得controlnet pose圖片的request
exports.getControlnetPose =  (req, res) => {
    const imagesDir = path.join('public', 'images','controlnet_pose', req.params.category, req.params.pose);
  
    fs.readdir(imagesDir, (err, files) => {
      if (err) {
        console.error('Error reading images directory:', err);
        return res.status(500).json({ error: 'Error reading images directory' });
      }
  
      const imageFiles = files.filter(file => path.extname(file).toLowerCase() === '.jpg' || path.extname(file).toLowerCase() === '.png');
      const imageUrls = imageFiles.map(file => `/images/controlnet_pose/${req.params.category}/${req.params.pose}/${file}`);
  
      res.json(imageUrls);
    });
  };
  
  
  // 處理取得template 圖片的request
  exports.getTemplateImage = (req,res)=>{
    const imagesDir = path.join('public', 'images','template');
    fs.readdir(imagesDir, (err, files) => {
      if (err) {
        console.error('Error reading images directory:', err);
        return res.status(500).json({ error: 'Error reading images directory' });
      }
      const imageFiles = files.filter(file => path.extname(file).toLowerCase() === '.jpg' || path.extname(file).toLowerCase() === '.png');
      const imageUrls = imageFiles.map(file => `/images/template/${file}`);
      res.json(imageUrls);
    });
  };
  