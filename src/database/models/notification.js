/* eslint-disable valid-jsdoc, require-jsdoc */
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
  }
  Notification.init(
    {
      type: DataTypes.STRING,
      message: DataTypes.STRING,
      read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      recipientId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Notification",
    }
  );
  return Notification;
};
