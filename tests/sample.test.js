/* eslint-disable */
import request from "supertest";
import app from "../src/app";
import { User, Blacklist } from "../src/database/models/index";
import JwtUtil from "../src/utils/generateToken";
import { httpRequest, httpResponse } from "./mock/user.mock.data";
import UserController from "../src/controllers/userController";
import "dotenv/config";
// const { User } = require("../src/database/models");

// afterAll(async () => {
//   await User.destroy({ truncate: true, cascade: false });
// });

describe("Testing the home route", () => {
  test("Get a status of 200", async () => {
    const response = await request(app).get("/api/v1").send();
    expect(response.statusCode).toBe(200);
  });
});

describe("Testing the registration route", () => {
  let token = "";
  test("Get a status of 400", async () => {
    const response = await request(app).post("/api/v1/users/signup").send({
      // name:"test",
      email: "test123@gmail.com",
      password: "test12345",
    });
    expect(response.statusCode).toBe(400);
  });
  test("Get a status of 200", async () => {
    const response = await request(app).post("/api/v1/users/signup").send({
      name: "test",
      email: `test1234@gmail.com`,
      password: "test12345",
      gender: "Male",
      preferredLanguage: "English",
      preferredCurrency: "RWF",
      birthdate: "01/01/2000",
      city: "Kigali",
      province: "Kigali",
      postalCode: "90231",
      street: "KG 305 ST",
      country: "Rwanda",
    });
    token = response.body.user.token;
    expect(response.statusCode).toBe(201);
  });
  test("Get a status of 409", async () => {
    const response = await request(app).post("/api/v1/users/signup").send({
      name: "test",
      email: `test1234@gmail.com`,
      password: "test12345",
      gender: "Male",
      preferredLanguage: "English",
      preferredCurrency: "RWF",
      birthdate: "01/01/2000",
      city: "Kigali",
      province: "Kigali",
      postalCode: "90231",
      street: "KG 305 ST",
      country: "Rwanda",
    });
    expect(response.statusCode).toBe(409);
  });

  test("Verify User Get a status of 200", async () => {
    const response = await request(app)
      .get(`/api/v1/users/verify-email/${token}`)
      .send();
    expect(response.statusCode).toBe(200);
  });
  test("Verify User Get a status of 409", async () => {
    const response = await request(app)
      .get(`/api/v1/users/verify-email/${token}`)
      .send();
    expect(response.statusCode).toBe(409);
  });

  // afterAll(async () => {
  //     await User.destroy({ where : {email:"test1234@gmail.com"} });
  // });

  test("test server error failed to signup the user ", async () => {
    jest
      .spyOn(User, "create")
      .mockImplementation(
        jest.fn().mockRejectedValue(new Error("Database error"))
      );
    const response = await request(app).post("/api/v1/users/signup").send({
      name: "test",
      email: `test12345@gmail.com`,
      password: "test12345",
      gender: "Male",
      preferredLanguage: "English",
      preferredCurrency: "RWF",
      birthdate: "01/01/2000",
      city: "Kigali",
      province: "Kigali",
      postalCode: "90231",
      street: "KG 305 ST",
      country: "Rwanda",
    });
    expect(response.statusCode).toBe(500);
  });
});
describe("Testing swagger", () => {
  test("Get a status of 304", async () => {
    const response = await request(app).get("/api-docs").send();
    expect(response.statusCode).toBe(301);
  });
});

describe("Login with local passport", () => {
  test("user login for getting status of 200", async () => {
    const response = await request(app).post("/api/v1/users/login").send({
      email: `test1234@gmail.com`,
      password: "test12345",
    });
    expect(response.statusCode).toBe(200);
  });

  test("user login for getting status of 400", async () => {
    const response = await request(app).post("/api/v1/users/login").send({
      email: "jimmygmcom",
      password: "jimmy3535",
    });
    expect(response.statusCode).toBe(400);
  });

  test("user login for getting status of 401", async () => {
    const response = await request(app).post("/api/v1/users/login").send({
      email: "jim@gmail.com",
      password: "jimmy3535",
    });
    expect(response.statusCode).toBe(401);
  });

  test("user login for getting status of 401", async () => {
    const res = await request(app).post("/api/v1/users/login").send({
      email: `test1234@gmail.com`,
      password: "jimmy35",
    });
    expect(res.statusCode).toBe(401);
  });
});

describe("Login via google", () => {
  test("redirect to google and authenticate", async () => {
    const data = await UserController.googleAuth(
      httpRequest("example@example.com"),
      httpResponse()
    );
    expect(data.body).toHaveProperty("token");
  });

  test("testing register", async () => {
    const data = await UserController.googleAuth(
      httpRequest("test123@gmail.com"),
      httpResponse()
    );
    expect(data.body.user).toHaveProperty("token");
  });
  // expect(response.statusCode).toBe(401);
});

describe("testing the two factor authentication", () => {
  test("validate the token and get a 200", async () => {
    const signup = await request(app).post("/api/v1/users/signup").send({
      name: "test",
      email: `test14@gmail.com`,
      password: "test12345",
      gender: "Male",
      preferredLanguage: "English",
      preferredCurrency: "RWF",
      birthdate: "01/01/2000",
      city: "Kigali",
      province: "Kigali",
      postalCode: "90231",
      street: "KG 305 ST",
      country: "Rwanda",
    });

    await request(app)
      .get(`/api/v1/users/verify-email/${signup.body.user.token}`)
      .send();

    const login = await request(app).post("/api/v1/users/login").send({
      email: `test14@gmail.com`,
      password: "test12345",
    });
    const MyTokener = login.body.token;
    const extractor = JwtUtil.verify(MyTokener);
    // const {role} = extractor.data;
    // console.log(role)
    const authToken = extractor.data.randomAuth;
    const checkToken = await request(app)
      .post(`/api/v1/users/${MyTokener}/auth/validate`)
      .send({
        token: authToken,
      });
    expect(checkToken.statusCode).toBe(200);
  });

  test("verify a user and get a 500", async () => {
    const signup = await request(app).post("/api/v1/users/signup").send({
      name: "test",
      email: `test14@gmail.com`,
      password: "test12345",
      gender: "Male",
      preferredLanguage: "English",
      preferredCurrency: "RWF",
      birthdate: "01/01/2000",
      city: "Kigali",
      province: "Kigali",
      postalCode: "90231",
      street: "KG 305 ST",
      country: "Rwanda",
    });
    const login = await request(app).post("/api/v1/users/login").send({
      email: `test14@gmail.com`,
      password: "test12345",
    });
    const MyTokener = login.body.token.user;
    const authToken = "1234";
    const response = await request(app)
      .post(`/api/v1/users/${MyTokener}/auth/validate`)
      .send({
        token: authToken,
      });
    expect(response.statusCode).toBe(500);
  });

  test("verify a user and get a 400", async () => {
    const login = await request(app).post("/api/v1/users/login").send({
      email: `test14@gmail.com`,
      password: "test12345",
    });
    const MyTokener = login.body.token;
    const authToken = "1234";
    const response = await request(app)
      .post(`/api/v1/users/${MyTokener}/auth/validate`)
      .send({
        token: authToken,
      });
    expect(response.statusCode).toBe(400);
  });
  afterAll(async () => {
    await User.destroy({ where: { email: "test14@gmail.com" } });
  });
});
describe("User logout", () => {
  test("User logout for getting status of 200 ", async () => {
    const user = await request(app).post("/api/v1/users/signup").send({
      name: "test",
      email: `test@gmail.com`,
      password: "test1234",
      gender: "Male",
      preferredLanguage: "English",
      preferredCurrency: "RWF",
      birthdate: "01/01/2000",
      city: "Kigali",
      province: "Kigali",
      postalCode: "90231",
      street: "KG 305 ST",
      country: "Rwanda",
    });
    await request(app)
      .get(`/api/v1/users/verify-email/${user.body.user.token}`)
      .send();
    const userLogin = await request(app).post("/api/v1/users/login").send({
      email: `test@gmail.com`,
      password: "test1234",
    });
    const token = userLogin.body.token;
    const response = await request(app)
      .get("/api/v1/users/logout")
      .set("Authorization", "Bearer " + token)
      .send();
    expect(response.statusCode).toBe(200);
  });

  test("User logout for getting status of 401", async () => {
    const token = process.env.TOKEN;
    const response = await request(app)
      .get("/api/v1/users/logout")
      .set("Authorization", token)
      .send();
    expect(response.statusCode).toBe(401);
  });

  test("User logout for getting status of 500 ", async () => {
    const user = await request(app).post("/api/v1/users/signup").send({
      name: "test1",
      email: `test1@gmail.com`,
      password: "test1234",
      gender: "Male",
      preferredLanguage: "English",
      preferredCurrency: "RWF",
      birthdate: "01/01/2000",
      city: "Kigali",
      province: "Kigali",
      postalCode: "90231",
      street: "KG 305 ST",
      country: "Rwanda",
    });
    await request(app)
      .get(`/api/v1/users/verify-email/${user.body.user.token}`)
      .send();
    const userLogin = await request(app).post("/api/v1/users/login").send({
      email: `test1@gmail.com`,
      password: "test1234",
    });
    const token = userLogin.body.token;
    jest
      .spyOn(Blacklist, "create")
      .mockImplementation(
        jest.fn().mockRejectedValue(new Error("Database error"))
      );
    const response = await request(app)
      .get("/api/v1/users/logout")
      .set("Authorization", "Bearer " + token)
      .send();
    expect(response.statusCode).toBe(500);
  });

  afterAll(async () => {
    await User.destroy({ where: { email: "test@gmail.com" } });
  });
});

describe("Testing the update password", () => {
  test("Get a 200", async () => {
    const signup = await request(app).post("/api/v1/users/signup").send({
      name: "test",
      email: `test@gmail.com`,
      password: "test1234",
      gender: "Male",
      preferredLanguage: "English",
      preferredCurrency: "RWF",
      birthdate: "01/01/2000",
      city: "Kigali",
      province: "Kigali",
      postalCode: "90231",
      street: "KG 305 ST",
      country: "Rwanda",
    });
    const update = await request(app)
      .put("/api/v1/users/password-update")
      .send({
        oldPassword: "test1234",
        newPassword: "okay1234",
        confirmPassword: "okay1234",
      })
      .set("Authorization", `Bearer ${signup.body.user.token}`);
    expect(update.statusCode).toBe(200);
    const updateValidation = await request(app)
      .put("/api/v1/users/password-update")
      .send({
        oldPassword: "okay12",
        newPassword: "okay1234",
        confirmPassword: "okay1234",
      })
      .set("Authorization", `Bearer ${signup.body.user.token}`);
    expect(updateValidation.statusCode).toBe(400);
    const updateValidation1 = await request(app)
      .put("/api/v1/users/password-update")
      .send({
        oldPassword: "okay1234",
        newPassword: "okay1234",
        confirmPassword: "okay123",
      })
      .set("Authorization", `Bearer ${signup.body.user.token}`);
    expect(updateValidation1.statusCode).toBe(400);
    const updateValidation2 = await request(app)
      .put("/api/v1/users/password-update")
      .send({
        oldPassword: "okay1234",
        nwPassword: "okay1234",
        Password: "okay",
      })
      .set("Authorization", `Bearer ${signup.body.user.token}`);
    expect(updateValidation2.statusCode).toBe(400);
    const updateAuth = await request(app)
      .put("/api/v1/users/password-update")
      .send({
        oldPassword: "okay1234",
        nwPassword: "okay1234",
        Password: "okay1234",
      })
      .set("Authorization", "Bearer ksajs293io23jkqw");

    expect(updateAuth.statusCode).toBe(401);
    const updateAuth1 = await request(app)
      .put("/api/v1/users/password-update")
      .send({
        oldPassword: "okay1234",
        newPassword: "okay1235",
        confirmPassword: "okay1235",
      });
    expect(updateAuth1.statusCode).toBe(401);
  });
  afterAll(async () => {
    await User.destroy({ where: { email: "test@gmail.com" } });
  });
});

describe("Testing the reset password via email", () => {
  test("Invalid request", async () => {
    const invalidRequest = await request(app)
      .post("/api/v1/users/password-reset-request")
      .send({
        email: "trojansecommerce@gmail.com",
      });
    expect(invalidRequest.statusCode).toBe(403);
  });
  test("Sending a test request", async () => {
    const signup = await request(app).post("/api/v1/users/signup").send({
      name: "test",
      email: `trojansecommerce@gmail.com`,
      password: "test1234",
      gender: "Male",
      preferredLanguage: "English",
      preferredCurrency: "RWF",
      birthdate: "01/01/2000",
      city: "Kigali",
      province: "Kigali",
      postalCode: "90231",
      street: "KG 305 ST",
      country: "Rwanda",
    });
    const resetRequest = await request(app)
      .post("/api/v1/users/password-reset-request")
      .send({
        email: "trojansecommerce@gmail.com",
      });
    expect(resetRequest.statusCode).toBe(200);
    const getreset = await request(app)
      .get("/api/v1/users/password-reset/" + signup.body.user.token)
      .send();
    expect(getreset.statusCode).toBe(200);
    const reset = await request(app)
      .post("/api/v1/users/password-reset/" + signup.body.user.token)
      .send({
        newPassword: "andela25",
        confirmPassword: "andela25",
      });
    expect(reset.statusCode).toBe(200);
    const invalidReset = await request(app)
      .post("/api/v1/users/password-reset/" + signup.body.user.token)
      .send({
        newPassword: "andel",
        confirmPassword: "andel",
      });
    expect(invalidReset.statusCode).toBe(400);
    const confirmFail = await request(app)
      .post("/api/v1/users/password-reset/" + signup.body.user.token)
      .send({
        newPassword: "andela25",
        confirmPassword: "andela26",
      });
    expect(confirmFail.statusCode).toBe(400);
  });
  afterAll(async () => {
    await User.destroy({ where: { email: "trojansecommerce@gmail.com" } });
  });
});
describe("Testing the admin routes", () => {
  test("Get a status of 200", async () => {
    const login = await request(app).post("/api/v1/users/login").send({
      // name:"test",
      email: "admin123@gmail.com",
      password: "admin123",
    });
    expect(login.statusCode).toBe(200);
    const getID = await request(app)
      .get("/api/v1/users")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send();
    expect(getID.statusCode).toBe(200);
  });
  test("Admin assigning roles to users", async () => {
    const login = await request(app).post("/api/v1/users/login").send({
      // name:"test",
      email: "admin123@gmail.com",
      password: "admin123",
    });
    expect(login.statusCode).toBe(200);
    const getID = await request(app)
      .get("/api/v1/users")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send();
    const user = await User.findOne({ where: { email: "test1234@gmail.com" } });
    const { id } = user.dataValues;
    const assign = await request(app)
      .patch(`/api/v1/users/${id}/role`)
      .set("Authorization", `Bearer ${login.body.token}`)
      .send({ role: "seller" });
    expect(assign.statusCode).toBe(200);
    const wrongRole = await request(app)
      .patch(`/api/v1/users/${id}/role`)
      .set("Authorization", `Bearer ${login.body.token}`)
      .send({ role: "hbnxbweu" });
    expect(wrongRole.statusCode).toBe(400);
    const alreadyAssigned = await request(app)
      .patch(`/api/v1/users/${id}/role`)
      .set("Authorization", `Bearer ${login.body.token}`)
      .send({ role: "seller" });
    expect(alreadyAssigned.statusCode).toBe(409);
  });
  test("Get a status of 200 to disable an account", async () => {
    const login = await request(app).post("/api/v1/users/login").send({
      // name:"test",
      email: "admin123@gmail.com",
      password: "admin123",
    });
    expect(login.statusCode).toBe(200);
    const getID = await request(app)
      .get("/api/v1/users")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send();
    const user = await User.findOne({ where: { email: "test1234@gmail.com" } });
    const { id } = user.dataValues;
    const disableStatus = await request(app)
      .post(`/api/v1/users/${id}/update-status`)
      .set("Authorization", `Bearer ${login.body.token}`)
      .send();
    expect(disableStatus.statusCode).toBe(200);
    const enableStatus = await request(app)
      .post(`/api/v1/users/${id}/update-status`)
      .set("Authorization", `Bearer ${login.body.token}`)
      .send();
    expect(enableStatus.statusCode).toBe(200);
  });
  test("Get a status of 401 if its not an Admin", async () => {
    const login = await request(app).post("/api/v1/users/login").send({
      // name:"test",
      email: "test1234@gmail.com",
      password: "test12345",
    });
    expect(login.statusCode).toBe(200);
    const getID = await request(app)
      .get("/api/v1/users")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send();
    const user = await User.findOne({ where: { email: "test1234@gmail.com" } });
    const { id } = user.dataValues;
    const disableStatus = await request(app)
      .post(`/api/v1/users/${id}/update-status`)
      .set("Authorization", `Bearer ${login.body.token}`)
      .send();
    expect(disableStatus.statusCode).toBe(401);
  });
  test("Get a status of 401 if its not an Admin", async () => {
    const login = await request(app).post("/api/v1/users/login").send({
      // name:"test",
      email: "test1234@gmail.com",
      password: "test12345",
    });
    expect(login.statusCode).toBe(200);
    const getID = await request(app).get("/api/v1/users").send();
    const user = await User.findOne({ where: { email: "test1234@gmail.com" } });
    const { id } = user.dataValues;
    const disableStatus = await request(app)
      .post(`/api/v1/users/${id}/update-status`)
      .set("Authorization", `Bearer ${login.body.token}`)
      .send();
    expect(disableStatus.statusCode).toBe(401);
  });
  afterAll(async () => {
    await User.destroy({ where: { email: "test1234@gmail.com" } });
  });
});

describe("Test user profile update", () => {
  let userToken;
  beforeAll(async () => {
    const loginRes = await request(app).post("/api/v1/users/login").send({
      email: "example@example.com",
      password: "default",
    });

    userToken = loginRes.body.token;
  });

  test("Should be logged in to update your profile", async () => {
    const response = await request(app).patch("/api/v1/users/profile").send({
      preferredLanguage: "English",
      preferredCurrency: "RWF",
      city: "Kigali",
      province: "Kigali",
      postalCode: "90231",
      street: "KG 305 ST",
      country: "Rwanda",
    });
    expect(response.statusCode).toBe(401);
  });

  test("User doesn't exist", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJNdXNoYWlqYSIsImVtYWlsIjoiamFja3NvbkBnbWFpbC5jb20ifSwiaWF0IjoxNjc1OTE4MjE1fQ.jOwSOO4AZWNGNIx80gyus7l28dqH7tE55deI0vQceaQ";
    const response = await request(app)
      .patch("/api/v1/users/profile")
      .send({
        preferredLanguage: "English",
        preferredCurrency: "RWF",
        city: "Kigali",
        province: "Kigali",
        postalCode: "90231",
        street: "KG 305 ST",
        country: "Rwanda",
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(401);
  });

  test("Testing bad request", async () => {
    const response = await request(app)
      .patch("/api/v1/users/profile")
      .send({})
      .set("Authorization", `Bearer ${userToken}`);
    expect(response.statusCode).toBe(400);
  });

  test("Test success profile update", async () => {
    const response = await request(app)
      .patch("/api/v1/users/profile")
      .send({
        preferredLanguage: "English",
        preferredCurrency: "RWF",
        city: "Kigali",
        province: "Kigali",
        postalCode: "90231",
        street: "KG 305 ST",
        country: "Rwanda",
      })
      .set("Authorization", `Bearer ${userToken}`);
    expect(response.statusCode).toBe(200);
  });

  test("Test Page not found", async () => {
    const loginRes = await request(app).post("/api/login").send({
      email: `exampleemail2@gmail.com`,
      password: "test1234",
    });
    expect(loginRes.statusCode).toBe(404);
  });

  test("Test Internal server error", async () => {
    jest
      .spyOn(User, "update")
      .mockImplementation(
        jest.fn().mockRejectedValue(new Error("Database error"))
      );

    const response = await request(app)
      .patch("/api/v1/users/profile")
      .send({
        preferredLanguage: "English",
        preferredCurrency: "RWF",
        city: "Kigali",
        province: "Kigali",
        postalCode: "90231",
        street: "KG 305 ST",
        country: "Rwanda",
      })
      .set("Authorization", `Bearer ${userToken}`);
    expect(response.statusCode).toBe(500);
  });
});
