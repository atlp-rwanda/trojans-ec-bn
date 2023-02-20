module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "Products",
      [
        {
          name: "Under Armour",
          price: 2000,
          bonus: 2000,
          images: [
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491920/TrojansEcommerce/pqlvnsvkskzx4zo1trpb.jpg",
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491927/TrojansEcommerce/usun3ke7wyjeoqmoi2fa.jpg",
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491943/TrojansEcommerce/tcc47q8zbqhpqnt3k37e.jpg",
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491948/TrojansEcommerce/d61xpner8co9uommuoy6.jpg",
          ],
          sellerId: 2,
          expiryDate: new Date(),
          quantity: 20,
          categoryId: 1,
          available: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "T Shirt",
          price: 2000,
          bonus: 2000,
          images: [
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491920/TrojansEcommerce/pqlvnsvkskzx4zo1trpb.jpg",
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491927/TrojansEcommerce/usun3ke7wyjeoqmoi2fa.jpg",
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491943/TrojansEcommerce/tcc47q8zbqhpqnt3k37e.jpg",
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491948/TrojansEcommerce/d61xpner8co9uommuoy6.jpg",
          ],
          sellerId: 2,
          expiryDate: new Date(),
          quantity: 20,
          categoryId: 1,
          available: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Products", null, {}),
};
