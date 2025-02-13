const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const favicon = require('serve-favicon');
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb', extended: true}));

// 设置 EJS 作为视图引擎
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 使用静态文件夹
app.use(express.static(path.join(__dirname, 'public')));

// 解析 application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// 解析 application/json
app.use(bodyParser.json());


app.use(session({
    secret: 'my-secret-key', // 替换为你的秘密键
    resave: false,
    saveUninitialized: true,
}));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

const pageRoutes = require('./routes/pageRoutes');
app.use('/', pageRoutes);

const apiRoutes = require('./routes/apiRoutes');
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
