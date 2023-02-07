import request from "supertest";
import app from "../src/app";

const { User } = require("../src/database/models");

let token = "";
afterAll(async () => {
  await User.destroy({ truncate: true, cascade: false });
});

describe("Testing the home route", () => {
  test("Get a status of 200", async () => {
    const response = await request(app).get("/api/v1/").send();
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
    token = response.body.user.token;
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

test("should return status 401 if user account is not verified", async () => {
  const response = await request(app).post("/api/v1/users/login").send({
    email: `test1234@gmail.com`,
    password: "test12345",
  });
  expect(response.statusCode).toBe(401);
});

describe("Testing verifications", () => {
  test("Get a status of 200", async () => {
    const response = await request(app)
      .get(`/api/v1/users/verify-email/${token}`)
      .send();
    expect(response.statusCode).toBe(200);
  });
  test("Get a status of 409", async () => {
    const response = await request(app)
      .get(`/api/v1/users/verify-email/${token}`)
      .send();
    expect(response.statusCode).toBe(409);
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
