const { BcryptUtil } = require("../../utils/bcrypt");

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Admin Trojan",
          email: "admin123@gmail.com",
          password: BcryptUtil.hash("admin123"),
          role: "admin",
          status: "active",
          isVerified:true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "John Doe",
          email: "example@example.com",
          password: BcryptUtil.hash("default"),
          role: "seller",
          status: "active",
          isVerified:true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Users", null, {}),
};
