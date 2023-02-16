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
      ],
      {}
    ),

  down: (queryInterface) => queryInterface.bulkDelete("Categories", null, {}),
};
