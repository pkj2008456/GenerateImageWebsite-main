const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');
const User = require('./user'); // 引入 User 模型

// 定義 Image 模型
const Image = sequelize.define('Image', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'id'
    },
    allowNull: false
  },
  image_url: {
    type: DataTypes.STRING(200),
    allowNull: false
  }
}, {
  tableName: 'image'
});

// 設置關聯
User.hasMany(Image, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Image.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Image;
