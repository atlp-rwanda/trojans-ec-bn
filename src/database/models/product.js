/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Category, {
        foreignKey: "categoryId",
        as: "category",
      });
      this.belongsTo(models.User, { foreignKey: "sellerId", as: "seller" });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.NUMBER,
      quantity: DataTypes.INTEGER,
      available: { type: DataTypes.BOOLEAN, defaultValue: false },
      categoryId: {
        type: DataTypes.INTEGER,
        references: { model: "Categories", key: "id" },
      },
      sellerId: {
        type: DataTypes.INTEGER,
        references: { model: "Users", key: "id" },
      },
      bonus: DataTypes.NUMBER,
      images: DataTypes.ARRAY(DataTypes.STRING),
      expiryDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
