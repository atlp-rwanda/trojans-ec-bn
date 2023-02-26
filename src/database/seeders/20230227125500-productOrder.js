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
    await queryInterface.bulkInsert("productOrders", [
      {
        orderStatus: "complete",
        buyerId: 6,
        productId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderStatus: "complete",
        buyerId: 3,
        productId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderStatus: "pending",
        buyerId: 6,
        productId: 4,
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
    await queryInterface.bulkDelete("productOrders", null, {});
  },
};
