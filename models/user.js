const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');
const { v4: uuidv4 } = require('uuid');

// 定義 User 模型
const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: uuidv4,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING(80),
    unique: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(120),
    unique: true,
    allowNull: false
  }
}, {
  tableName: 'user'
});

module.exports = User;
