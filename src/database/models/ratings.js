/* eslint-disable require-jsdoc,valid-jsdoc,strict,import/newline-after-import */

"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ratings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "buyerId", as: "buyer" });
      this.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product",
      });
    }
  }
  Ratings.init(
    {
      name: DataTypes.STRING,
      rate: DataTypes.INTEGER,
      feedback: DataTypes.STRING,
      buyerId: {
        type: DataTypes.INTEGER,
        references: { model: "Users", key: "id" },
      },
      productId: {
        type: DataTypes.INTEGER,
        references: { model: "Products", key: "id" },
      },
    },
    {
      sequelize,
      modelName: "Ratings",
    }
  );
  return Ratings;
};
