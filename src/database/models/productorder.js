/* eslint-disable require-jsdoc,valid-jsdoc,strict,import/newline-after-import */

"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class productOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "buyerId", as: "boughtBy" });
      this.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product",
      });
    }
  }
  productOrder.init(
    {
      orderStatus: DataTypes.STRING,
      buyerId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "productOrder",
    }
  );
  return productOrder;
};
