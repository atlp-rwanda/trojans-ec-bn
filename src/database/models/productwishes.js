/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductWishes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Product, { foreignKey: "product_id" });
    }
  }
  ProductWishes.init({
    product_id: {type:DataTypes.INTEGER,references: { model: "Products", key: "id" },},
    users: DataTypes.ARRAY(DataTypes.STRING),
    
  }, {
    sequelize,
    modelName: 'ProductWishes',
  });
  return ProductWishes;
};