module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "Categories",
      [
        {
          name: "shoes",
        },
        {
          name: "clothing",
        },
        {
          name: "food",
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Categories", null, {}),
};
