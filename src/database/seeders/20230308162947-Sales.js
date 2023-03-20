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
    await queryInterface.bulkInsert(
      "Sales",
      [
        {
          Orderid: 1,
          Productid: 1,
          Sellerid: 2,
          Status: "delivered",
          Quantity: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          Orderid: 2,
          Productid: 2,
          Sellerid: 2,
          Status: "delivered",
          Quantity: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          Orderid: 3,
          Productid: 2,
          Sellerid: 7,
          Status: "pending",
          Quantity: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Sales", null, {});
  },
};
