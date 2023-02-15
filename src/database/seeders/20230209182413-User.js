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
          gender: "Male",
          preferredLanguage: "English",
          preferredCurrency: "RWF",
          birthdate: "01/01/2000",
          profilePic:
            "https://res.cloudinary.com/dmjxukx09/image/upload/v1675844692/profiles/Profile-Avatar-PNG-Free-Download_paqfrf.png",
          billingAddress:
            '{"street":"KN 05 ST","city":"Kigali","province":"Kigali","postalCode":"00000","country":"Rwanda"}',
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
          gender: "Male",
          preferredLanguage: "English",
          preferredCurrency: "RWF",
          birthdate: "01/01/2000",
          profilePic:
            "https://res.cloudinary.com/dmjxukx09/image/upload/v1675844692/profiles/Profile-Avatar-PNG-Free-Download_paqfrf.png",
          billingAddress:
            '{"street":"KN 05 ST","city":"Kigali","province":"Kigali","postalCode":"00000","country":"Rwanda"}',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Users", null, {}),
};