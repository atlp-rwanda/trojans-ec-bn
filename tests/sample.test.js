import request from "supertest";
import app from "../src/app";

const { User } = require("../src/database/models");

afterAll(async () => {
  await User.destroy({ truncate: true, cascade: false });
});

describe("Testing the home route", () => {
  test("Get a status of 200", async () => {
    const response = await request(app).get("/home").send();
    expect(response.statusCode).toBe(200);
  });
});

describe("Testing the registration route", () => {
  test("Get a status of 400", async () => {
    const response = await request(app).post("/signup").send({
      // name:"test",
      email: "test123@gmail.com",
      password: "test12345",
    });
    expect(response.statusCode).toBe(400);
  });
  test("Get a status of 200", async () => {
    const response = await request(app).post("/signup").send({
      name: "test",
      email: `test1234@gmail.com`,
      password: "test12345",
    });
    expect(response.statusCode).toBe(201);
  });
  test("Get a status of 409", async () => {
    const response = await request(app).post("/signup").send({
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
  const response = await request(app).post("/login").send({
    email: `test1234@gmail.com`,
    password: "test12345",
  });
  expect(response.statusCode).toBe(200);
});

test("user login for getting status of 400", async () => {
  const response = await request(app).post("/login").send({
    email: "jimmygmcom",
    password: "jimmy3535",
  });
  expect(response.statusCode).toBe(400);
});

test("user login for getting status of 401", async () => {
  const response = await request(app).post("/login").send({
    email: "jim@gmail.com",
    password: "jimmy3535",
  });
  expect(response.statusCode).toBe(401);
});

test("user login for getting status of 401", async () => {
  const response = await request(app).post("/login").send({
    email: `test1234@gmail.com`,
    password: "jimmy35",
  });
  expect(response.statusCode).toBe(401);
});
