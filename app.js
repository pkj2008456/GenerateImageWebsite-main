const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database/mydatabase.db'); 
const app = express();
const port = 3000;

// 設置靜態文件夾
app.use(express.static(path.join(__dirname, 'public')));

// 根路由回應 HTML 文件
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'MainPage.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
