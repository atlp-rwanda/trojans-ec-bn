const { BcryptUtil } = require("../../utils/bcrypt");
// import { BcryptUtil } from "../../utils/bcrypt";

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
          isVerified: true,
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
          isVerified: true,
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
          name: "test1",
          email: "test1234@example.com",
          password: BcryptUtil.hash("default123"),
          role: "buyer",
          status: "active",
          isVerified: true,
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
          name: "testBuyer",
          email: "testBuyer@example.com",
          password: BcryptUtil.hash("default"),
          role: "buyer",
          status: "active",
          isVerified: true,
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
          name: "testSeller",
          email: "testSeller@example.com",
          password: BcryptUtil.hash("default"),
          role: "seller",
          status: "active",
          isVerified: true,
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
          name: "Jane Doe",
          email: "janedoe@example.com",
          password: BcryptUtil.hash("default"),
          role: "seller",
          status: "active",
          isVerified: true,
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
          name: "Joseph Doe",
          email: "testSeller@example.com",
          password: BcryptUtil.hash("default"),
          role: "buyer",
          status: "active",
          isVerified: true,
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
