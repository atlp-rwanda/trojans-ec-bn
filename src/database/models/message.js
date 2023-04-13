/* eslint-disable valid-jsdoc, require-jsdoc */
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "userId"});
    }
  }
  Message.init(
    {
      message: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        references: { model: "Users", key: "id" },
      },
    },

    {
      sequelize,
      modelName: "Message",
    }
  );
  return Message;
};
