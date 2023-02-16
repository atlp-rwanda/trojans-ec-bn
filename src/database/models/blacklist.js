/* eslint-disable require-jsdoc, valid-jsdoc */
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Blacklist extends Model {
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
  Blacklist.init(
    {
      token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Blacklist",
    }
  );
  return Blacklist;
};
