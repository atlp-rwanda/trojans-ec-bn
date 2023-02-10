/* eslint-disable no-underscore-dangle */
import request from "supertest";
import app from "../src/app";

const { User } = require("../src/database/models");

afterAll(async () => {
  await User.destroy({ truncate: true, cascade: false });
});

describe("Testing the home route", () => {
  test("Get a status of 200", async () => {
    const response = await request(app).get("/api/v1").send();
    expect(response.statusCode).toBe(200);
  });
});

describe("Testing the registration route", () => {
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
    });
    expect(response.statusCode).toBe(201);
  });
  test("Get a status of 409", async () => {
    const response = await request(app).post("/api/v1/users/signup").send({
      name: "test",
      email: `test1234@gmail.com`,
      password: "test12345",
    });
    expect(response.statusCode).toBe(409);
  });
});
describe("Testing swagger", () => {
  test("Get a status of 304", async () => {
    const response = await request(app).get("/api-docs").send();
    expect(response.statusCode).toBe(301);
  });
});
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
  const response = await request(app).post("/api/v1/users/login").send({
    email: `test1234@gmail.com`,
    password: "jimmy35",
  });
  expect(response.statusCode).toBe(401);
});

describe("Testing the update password", () => {
  test("Get a 200", async () => {
    const signup = await request(app).post("/api/v1/users/signup").send({
      name: "test",
      email: `test@gmail.com`,
      password: "test1234",
    });
    const update = await request(app)
      .put("/api/v1/users/password-update")
      .send({
        oldPassword: "test1234",
        newPassword: "okay1234",
        confirmPassword: "okay1234",
      })
      .set("Authorization", `Bearer ${signup._body.user.token}`);
    expect(update.statusCode).toBe(200);
    const updateValidation = await request(app)
      .put("/api/v1/users/password-update")
      .send({
        oldPassword: "okay12",
        newPassword: "okay1234",
        confirmPassword: "okay1234",
      })
      .set("Authorization", `Bearer ${signup._body.user.token}`);
    expect(updateValidation.statusCode).toBe(400);
    const updateValidation1 = await request(app)
      .put("/api/v1/users/password-update")
      .send({
        oldPassword: "okay1234",
        newPassword: "okay1234",
        confirmPassword: "okay123",
      })
      .set("Authorization", `Bearer ${signup._body.user.token}`);
    expect(updateValidation1.statusCode).toBe(400);
    const updateValidation2 = await request(app)
      .put("/api/v1/users/password-update")
      .send({
        oldPassword: "okay1234",
        nwPassword: "okay1234",
        Password: "okay",
      })
      .set("Authorization", `Bearer ${signup._body.user.token}`);
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
    });
    const resetRequest = await request(app)
      .post("/api/v1/users/password-reset-request")
      .send({
        email: "trojansecommerce@gmail.com",
      });
    expect(resetRequest.statusCode).toBe(200);
    const getreset = await request(app)
      .get(resetRequest.body.link.replace("http://localhost:3000", ""))
      .send();
    expect(getreset.statusCode).toBe(200);
    const reset = await request(app)
      .post(resetRequest.body.link.replace("http://localhost:3000", ""))
      .send({
        newPassword: "andela25",
        confirmPassword: "andela25",
      });
    expect(reset.statusCode).toBe(200);
    const invalidReset = await request(app)
      .post(resetRequest.body.link.replace("http://localhost:3000", ""))
      .send({
        newPassword: "andel",
        confirmPassword: "andel",
      });
    expect(invalidReset.statusCode).toBe(400);
    const confirmFail = await request(app)
      .post(resetRequest.body.link.replace("http://localhost:3000", ""))
      .send({
        newPassword: "andela25",
        confirmPassword: "andela26",
      });
    expect(confirmFail.statusCode).toBe(400);
  });
});
