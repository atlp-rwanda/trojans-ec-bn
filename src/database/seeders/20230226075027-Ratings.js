/* eslint-disable strict */

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Ratings", [
      {
        name: "Joseph Doe",
        rate: 4,
        feedback: "i love this product it's very unique",
        buyerId: 9,
        productId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Joseph Doe",
        rate: 2,
        feedback: "i love this product it's very unique",
        buyerId: 3,
        productId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Joseph Doe",
        rate: 3,
        feedback: "i love this product it's very unique",
        buyerId: 4,
        productId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Joseph Doe",
        rate: 5,
        feedback: "i love this product it's very unique",
        buyerId: 7,
        productId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Joseph Doe",
        rate: 5,
        feedback: "i love this product it's very unique",
        buyerId: 8,
        productId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Joseph Doe",
        rate: 3,
        feedback: "i love this product it's very unique",
        buyerId: 1,
        productId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Ratings", null, {});
  },
};
