export const httpRequest = (email) => ({
  user: {
    email,
    name: {
      familyName: "request",
      middleName: "request",
      givenName: "request",
    },
    password: "defaultPassword",
  },
});

export const httpResponse = () => {
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
