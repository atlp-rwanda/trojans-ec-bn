// const { cryptr } = require("../../utils/bcrypt");

module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert(
      "Messages",
      [
        {
          id: 1,
          userId: 6,
          // message: cryptr.encrypt("Hey there"),
          message: "Hey there",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface) => queryInterface.bulkDelete("Messages", null, {}),
};
