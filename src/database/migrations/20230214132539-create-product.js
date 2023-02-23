/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.NUMERIC,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      available: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: { model: "Categories", key: "id" },
      },
      sellerId: {
        type: Sequelize.INTEGER,
        references: { model: "Users", key: "id" },
      },
      bonus: {
        type: Sequelize.INTEGER,
      },
      images: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      expiryDate: {
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
    await queryInterface.dropTable("Products");
  },
};
