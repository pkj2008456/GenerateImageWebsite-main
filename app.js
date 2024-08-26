const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const expressWinston = require('express-winston');
const winston = require('winston');


// 设置 EJS 作为视图引擎
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 使用静态文件夹
app.use(express.static(path.join(__dirname, 'public')));

// 解析 application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// 解析 application/json
app.use(bodyParser.json());

// Session 中间件，必须在路由之前
app.use(session({
    secret: 'my-secret-key', // 替换为你的秘密键
    resave: false,
    saveUninitialized: true,
}));

// 导入路由
const pageRoutes = require('./routes/pageRoutes');
app.use('/', pageRoutes);

const apiRoutes = require('./routes/apiRoutes');
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
