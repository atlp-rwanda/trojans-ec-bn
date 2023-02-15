// const { User } = require("../database/models");
export const ask = (categoryId) => ({
  user: {
    id: 2,
    name: "John Doe",
    status: "active",
    email: "example@example.com",
    role: "seller",
  },
  body: {
    name: "Jordan",
    sellerId: 2,
    categoryId,
    expiryDate: new Date(),
    bonus: 2000,
    quantity: 20,
    price: 2000,
  },
  files: [
    {
      path: "path1",
    },
    {
      path: "path2",
    },
    {
      path: "path3",
    },
    {
      path: "path4",
    },
  ],
});

export const answer = () => {
  const res = {
    json: (data) => {
      res.body = data;
      return res;
    },
    status: (data) => {
      res.body = data;
      return res;
    },
  };
  return res;
};
