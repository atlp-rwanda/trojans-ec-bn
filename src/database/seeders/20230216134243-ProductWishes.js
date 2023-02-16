module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "ProductWishes",
      [
        {
          product_id: 1,
          users: [
            JSON.stringify({
              id: 1,
              name: "Admin Trojan",
              email: "admin123@gmail.com",
            }),
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 2,
          users: [
            JSON.stringify({
              id: 1,
              name: "Admin Trojan",
              email: "admin123@gmail.com",
            }),
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    queryInterface.bulkDelete("ProductWishes", null, {});
  },
};
