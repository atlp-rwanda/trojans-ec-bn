/* eslint-disable valid-jsdoc, require-jsdoc */

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Sales extends Model {
    static associate(models) {
      this.belongsTo(models.Order, { foreignKey: "Orderid", as: "order" });
      this.belongsTo(models.Product, {
        foreignKey: "Productid",
        as: "product",
      });
    }
  }
  Sales.init(
    {
      Orderid: {
        type: DataTypes.INTEGER,
        references: { model: "Orders", key: "id" },
      },
      Productid: {
        type: DataTypes.INTEGER,
        references: { model: "Products", key: "id" },
      },
      Sellerid: {
        type: DataTypes.INTEGER,
      },
      Status: {
        type: DataTypes.STRING,
        defaultValue: "created",
      },
      Quantity: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Sales",
    }
  );
  return Sales;
};
