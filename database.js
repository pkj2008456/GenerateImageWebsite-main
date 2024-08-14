const { Sequelize } = require('sequelize');

// 創建 Sequelize 實例
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/mydatabase.db' // 數據庫文件的路徑
});

// 測試數據庫連接
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// 導出 Sequelize 實例和測試函數
module.exports = {
  sequelize,
  testConnection
};
