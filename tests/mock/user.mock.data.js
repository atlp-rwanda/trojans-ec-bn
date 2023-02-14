export const httpRequest = (email) => ({
  user: {
    email,
    name: {
      familyName: "request",
      middleName: "request",
      givenName: "request",
    },
    password: "defaultPassword",
    gender: "Male",
    preferredLanguage: "English",
    preferredCurrency: "RWF",
    birthdate: "01/01/2000",
    billingAddress:
      '{"street":"KN 05 ST","city":"Kigali","province":"Kigali","postalCode":"00000","country":"Rwanda"}',
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
