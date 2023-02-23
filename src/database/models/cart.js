/* eslint-disable require-jsdoc, valid-jsdoc */
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "buyerId" });
    }
  }
  Cart.init(
    {
      items: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
      },
      buyerId: {
        type: DataTypes.INTEGER,
        references: { model: "Users", key: "id" },
      },
      total: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
