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
  }, {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
          Message.belongsTo(models.User);
        }
      }
    });
  return Message;
};