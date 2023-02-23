/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Product, { foreignKey: "sellerId", as: "product" });
      this.hasOne(models.Cart, { foreignKey: "buyerId" });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: { type: DataTypes.STRING, defaultValue: "buyer" },
      status: { type: DataTypes.STRING, defaultValue: "active" },
      isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
      gender: DataTypes.STRING,
      birthdate: DataTypes.DATE,
      preferredLanguage: DataTypes.STRING,
      preferredCurrency: DataTypes.STRING,
      lastTimePasswordUpdated: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      profilePic: {
        type: DataTypes.STRING,
        defaultValue:
          "https://res.cloudinary.com/dmjxukx09/image/upload/v1675844692/profiles/Profile-Avatar-PNG-Free-Download_paqfrf.png",
      },
      billingAddress: DataTypes.JSONB,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
