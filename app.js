const express = require('express');
const path = require('path');
const app = express();

// 设置 EJS 作为视图引擎
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 使用静态文件夹

app.use(express.static(path.join(__dirname, 'public')));


// 导入路由
const pageRoutes = require('./routes/pageRoutes');
app.use('/', pageRoutes);

const apiRoutes = require('./routes/apiRoutes');
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
