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
        {
          name: "phones",
        },
        {
          name: "laptops",
        },
      ],
      {}
    ),

  down: (queryInterface) => queryInterface.bulkDelete("Categories", null, {}),
};
