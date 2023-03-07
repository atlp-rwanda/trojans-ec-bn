/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Sales", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Orderid: {
        type: Sequelize.INTEGER,
        references: { model: "Orders", key: "id" },
      },
      Productid: {
        type: Sequelize.INTEGER,
      },
      Sellerid: {
        type: Sequelize.INTEGER,
      },
      Status: Sequelize.STRING,
      Quantity: Sequelize.STRING,
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
    await queryInterface.dropTable("Sales");
  },
};
