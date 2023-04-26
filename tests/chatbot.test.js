import request from "supertest";
import app from "../src/app";

const mockNodemailer = require("nodemailer-mock");

jest.mock("nodemailer", () => ({
  createTransport: () => mockNodemailer.mock,
}));

describe("Testing Chat Routes", () => {
  test("Get a status of 200", async () => {
    const login = await request(app).post("/api/v1/users/login").send({
      email: "admin123@gmail.com",
      password: "admin123",
    });
    const res = await request(app)
      .get("/api/v1/chats")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send();
    expect(res.statusCode).toBe(200);
  });

  test("Get a status of 200", async () => {
    const login = await request(app).post("/api/v1/users/login").send({
      email: "admin123@gmail.com",
      password: "admin123",
    });
    const res = await request(app)
      .get("/api/v1/chats/1")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send();
    expect(res.statusCode).toBe(200);
  });
  test("Get a status of 404", async () => {
    const login = await request(app).post("/api/v1/users/login").send({
      email: "admin123@gmail.com",
      password: "admin123",
    });
    const res = await request(app)
      .get("/api/v1/chats/1000")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send();
    expect(res.statusCode).toBe(404);
  });
});
