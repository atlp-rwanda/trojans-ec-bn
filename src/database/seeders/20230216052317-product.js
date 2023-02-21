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
          expiryDate: new Date("2035/01/01"),
          quantity: 20,
          categoryId: 1,
          available: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "nike airforce",
          price: 2500,
          bonus: 0,
          images: [
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491920/TrojansEcommerce/pqlvnsvkskzx4zo1trpb.jpg",
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491927/TrojansEcommerce/usun3ke7wyjeoqmoi2fa.jpg",
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491943/TrojansEcommerce/tcc47q8zbqhpqnt3k37e.jpg",
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491948/TrojansEcommerce/d61xpner8co9uommuoy6.jpg",
          ],
          sellerId: 7,
          expiryDate: new Date("2027/01/01"),
          quantity: 20,
          categoryId: 1,
          available: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "black sweater",
          price: 3000,
          bonus: 0,
          images: [
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491920/TrojansEcommerce/pqlvnsvkskzx4zo1trpb.jpg",
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491927/TrojansEcommerce/usun3ke7wyjeoqmoi2fa.jpg",
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491943/TrojansEcommerce/tcc47q8zbqhpqnt3k37e.jpg",
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491948/TrojansEcommerce/d61xpner8co9uommuoy6.jpg",
          ],
          sellerId: 2,
          expiryDate: new Date("2060/01/01"),
          quantity: 20,
          categoryId: 2,
          available: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "gray sweatpants",
          price: 15000,
          bonus: 0,
          images: [
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491920/TrojansEcommerce/pqlvnsvkskzx4zo1trpb.jpg",
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491927/TrojansEcommerce/usun3ke7wyjeoqmoi2fa.jpg",
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491943/TrojansEcommerce/tcc47q8zbqhpqnt3k37e.jpg",
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491948/TrojansEcommerce/d61xpner8co9uommuoy6.jpg",
          ],
          sellerId: 6,
          expiryDate: new Date("2024/01/01"),
          quantity: 20,
          categoryId: 2,
          available: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Mint",
          price: 1000,
          bonus: 0,
          images: [
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491920/TrojansEcommerce/pqlvnsvkskzx4zo1trpb.jpg",
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491927/TrojansEcommerce/usun3ke7wyjeoqmoi2fa.jpg",
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491943/TrojansEcommerce/tcc47q8zbqhpqnt3k37e.jpg",
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491948/TrojansEcommerce/d61xpner8co9uommuoy6.jpg",
          ],
          sellerId: 6,
          expiryDate: new Date("2050/01/01"),
          quantity: 20,
          categoryId: 3,
          available: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "50 Kg of sweat Potatoes",
          price: 50000,
          bonus: 0,
          images: [
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491920/TrojansEcommerce/pqlvnsvkskzx4zo1trpb.jpg",
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491927/TrojansEcommerce/usun3ke7wyjeoqmoi2fa.jpg",
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491943/TrojansEcommerce/tcc47q8zbqhpqnt3k37e.jpg",
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491948/TrojansEcommerce/d61xpner8co9uommuoy6.jpg",
          ],
          sellerId: 6,
          expiryDate: new Date("2024/01/01"),
          quantity: 20,
          categoryId: 3,
          available: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "ADIDAS",
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
