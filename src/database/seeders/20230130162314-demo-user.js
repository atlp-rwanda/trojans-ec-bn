/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        name: "Admin",
        email: "exampleadmin@example.com",
        password: "example123",
        role: "admin",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
        // add the hashing function
      },
      {
        name: "Buyer",
        email: "examplebuyer@example.com",
        password: "example123",
        role: "buyer",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Seller",
        email: "exampleseller@example.com",
        password: "example123",
        role: "seller",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
