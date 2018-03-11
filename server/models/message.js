'use strict';
module.exports = function (sequelize, DataTypes) {
  var Message = sequelize.define('Message', {
    sender: DataTypes.INTEGER,
    recipient: DataTypes.INTEGER,
    body: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    }
  });
  return Message;
};