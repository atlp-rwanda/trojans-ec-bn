/* eslint-disable valid-jsdoc, require-jsdoc */
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "BuyerId", as: "user" });
      this.hasMany(models.Sales, { foreignKey: "Orderid", as: "order" });
    }
  }
  Order.init(
    {
      BuyerId: {
        type: DataTypes.INTEGER,
        references: { model: "Users", key: "id" },
      },
      items: {
        type: DataTypes.JSONB,
      },
      Subtotal: DataTypes.STRING,
      status: {
        type: DataTypes.STRING,
        defaultValue: "created",
      },
      paymentStatus: {
        type: DataTypes.STRING,
        defaultValue: "pending",
      },
      deliveredDate: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
