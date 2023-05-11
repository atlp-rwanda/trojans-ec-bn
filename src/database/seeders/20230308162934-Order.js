/* eslint-disable strict */
const { Sequelize } = require("../models");

module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert(
      "Orders",
      [
        {
          BuyerId: 6,
          items: Sequelize.fn(
            "JSONB",
            JSON.stringify([
              {
                id: 5,
                name: "Mint",
                price: 1000,
                bonus: 0,
                image:"https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491920/TrojansEcommerce/pqlvnsvkskzx4zo1trpb.jpg",
                sellerId: 6,
                expiryDate: new Date("2050/01/01"),
                quantity: 20,
                categoryId: 3,
                available: true,
                expired: false,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                name: "nike airforce",
                price: 2500,
                bonus: 0,
                image:"https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491920/TrojansEcommerce/pqlvnsvkskzx4zo1trpb.jpg",
                sellerId: 7,
                expiryDate: new Date("2027/01/01"),
                quantity: 20,
                categoryId: 1,
                available: true,
                expired: false,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ])
          ),
          Subtotal: "3500",
          status: "complete",
          paymentStatus: "complete",
          deliveredDate: "09/05/2023",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          BuyerId: 6,
          items: Sequelize.fn(
            "JSONB",
            JSON.stringify([
              {
                name: "Potatoes",
                price: 50000,
                bonus: 0,
                image:"https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491920/TrojansEcommerce/pqlvnsvkskzx4zo1trpb.jpg",
                sellerId: 6,
                expiryDate: new Date("2024/01/01"),
                quantity: 20,
                categoryId: 3,
                available: true,
                expired: false,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
             
            ])
          ),
          Subtotal: "50000",
          status: "delivered",
          paymentStatus: "complete",
          deliveredDate: "07/06/2023",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          BuyerId: 6,
          items: Sequelize.fn(
            "JSONB",
            JSON.stringify([
              {
                id: 5,
                name: "Mint",
                price: 1000,
                bonus: 0,
                image:"https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491920/TrojansEcommerce/pqlvnsvkskzx4zo1trpb.jpg",
                sellerId: 6,
                expiryDate: new Date("2050/01/01"),
                quantity: 20,
                categoryId: 3,
                available: true,
                expired: false,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                name: "ADIDAS",
                price: 2000,
                bonus: 2000,
                image:"https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491920/TrojansEcommerce/pqlvnsvkskzx4zo1trpb.jpg",

                sellerId: 2,
                expiryDate: new Date(),
                quantity: 20,
                categoryId: 1,
                available: true,
                expired: false,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ])
          ),
          Subtotal: "3000",
          status: "pending",
          paymentStatus: "complete",
          deliveredDate: "05/09/2023",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface) => queryInterface.bulkDelete("Orders", null, {}),
};
