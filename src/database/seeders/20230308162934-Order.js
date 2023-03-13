/* eslint-disable strict */

module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert(
      "Orders",
      [
        {
          BuyerId: 6,
          Subtotal: "6000",
          status: "complete",
          paymentStatus: "complete",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          BuyerId: 3,
          Subtotal: "10000",
          status: "complete",
          paymentStatus: "complete",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          BuyerId: 3,
          Subtotal: "10000",
          status: "pending",
          paymentStatus: "complete",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface) => queryInterface.bulkDelete("Orders", null, {}),
};
