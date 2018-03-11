'use strict';

const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    online: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    }
  });
  User.generateHash = function (password) {
    return bcrypt.hash(password, bcrypt.genSaltSync(10));
  }
  User.prototype.validPassword = function (password) {
    return bcrypt.compare(password, this.password);
  }
  return User;
};