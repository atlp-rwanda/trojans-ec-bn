/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "Notifications",
      [
        {
          type: "Product Available",
          message:
            "The product Under Armour of the seller John Doe is now available for sale",
          read: false,
          recipientId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "Product Available",
          message:
            "The product Under Armour of the seller John Doe is now available for sale",
          read: false,
          recipientId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "Product Available",
          message:
            "The product Under Armour of the seller John Doe is now available for sale",
          read: false,
          recipientId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Notifications", null, {});
  },
};
