const { DataTypes } = require("sequelize");
const sequelize = require("../lib/sequalize");

const User = sequelize.define('User', {
  name: DataTypes.STRING,
  lastName: DataTypes.STRING,
  age: DataTypes.NUMBER,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  role: DataTypes.STRING,
})

module.exports = { User }