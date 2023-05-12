module.exports = {
  up: (queryInterface) =>
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

  down: (queryInterface) => queryInterface.bulkDelete("Categories", null, {}),
};
