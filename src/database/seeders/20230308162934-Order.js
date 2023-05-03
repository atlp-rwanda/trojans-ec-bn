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
          deliveredDate: "09/05/2023",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          BuyerId: 3,
          Subtotal: "10000",
          status: "complete",
          paymentStatus: "complete",
          deliveredDate: "07/06/2023",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          BuyerId: 3,
          Subtotal: "10000",
          status: "pending",
          paymentStatus: "complete",
          deliveredDate: "05/09/2023",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface) => queryInterface.bulkDelete("Orders", null, {}),
};
