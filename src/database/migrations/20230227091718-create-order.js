/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      BuyerId: {
        type: Sequelize.INTEGER,
      },
      items: {
        type: Sequelize.JSONB,
      },
      Subtotal: Sequelize.STRING,
      status: {
        type: Sequelize.STRING,
        defaultValue: "created",
      },
      paymentStatus: {
        type: Sequelize.STRING,
        defaultValue: "pending",
      },
      deliveredDate: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("orders");
  },
};
