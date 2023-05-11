import request from "supertest";
import app from "../src/app";
import { Ratings } from "../src/database/models/index";

const mockNodemailer = require("nodemailer-mock");

jest.mock("nodemailer", () => ({
  createTransport: () => mockNodemailer.mock,
}));

describe("A test for Product Rating", () => {
  test("get a 400 status for validation error", async () => {
    const buyer = await request(app).post("/api/v1/users/login").send({
      email: "testBuyer@example.com",
      password: "default",
    });
    const { token } = buyer.body;
    const id = 3;
    const rate = await request(app)
      .post(`/api/v1/products/${id}/ratings`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        rate: "",
        feedback: "",
      });
    expect(rate.statusCode).toBe(400);
  });
  test("get a 200 status for posting a review as a buyer", async () => {
    const buyer = await request(app).post("/api/v1/users/login").send({
      email: "testBuyer@example.com",
      password: "default",
    });
    const { token } = buyer.body;
    const id = 3;
    const rate = await request(app)
      .post(`/api/v1/products/${id}/ratings`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        rate: 5,
        feedback: "i loved this product so much planning to buy another",
      });
    expect(rate.statusCode).toBe(200);
  });
  test("get a 409 status for trying to repost a review as a buyer", async () => {
    const buyer = await request(app).post("/api/v1/users/login").send({
      email: "testBuyer@example.com",
      password: "default",
    });
    const { token } = buyer.body;
    const id = 3;
    const rate = await request(app)
      .post(`/api/v1/products/${id}/ratings`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        rate: 5,
        feedback: "i loved this product so much planning to buy another",
      });
    expect(rate.statusCode).toBe(409);
  });
  test.skip("get a 401 status for trying to post a review on a product which has a status of complete but you are not the one who bought it as a buyer", async () => {
    const buyer = await request(app).post("/api/v1/users/login").send({
      email: "testBuyer@example.com",
      password: "default",
    });
    const { token } = buyer.body;
    const id = 1;
    const rate = await request(app)
      .post(`/api/v1/products/${id}/ratings`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        rate: 5,
        feedback: "i loved this product so much planning to buy another",
      });
    expect(rate.statusCode).toBe(401);
  });
  test.skip("get a 400 status for trying to repost a review as a buyer on a product you didn't buy", async () => {
    const buyer = await request(app).post("/api/v1/users/login").send({
      email: "testBuyer@example.com",
      password: "default",
    });
    const { token } = buyer.body;
    const id = 2;
    const rate = await request(app)
      .post(`/api/v1/products/${id}/ratings`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        rate: 5,
        feedback: "i loved this product so much planning to buy another",
      });
    expect(rate.statusCode).toBe(400);
  });
  test("get a 400 status for trying to repost a review as a buyer on a product you with order not complete", async () => {
    const buyer = await request(app).post("/api/v1/users/login").send({
      email: "testBuyer@example.com",
      password: "default",
    });
    const { token } = buyer.body;
    const id = 4;
    const rate = await request(app)
      .post(`/api/v1/products/${id}/ratings`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        rate: 5,
        feedback: "i loved this product so much planning to buy another",
      });
    expect(rate.statusCode).toBe(400);
  });
  test("get a 200 status for updating a rating", async () => {
    const buyer = await request(app).post("/api/v1/users/login").send({
      email: "testBuyer@example.com",
      password: "default",
    });
    const { token } = buyer.body;
    const id = 3;
    const ratingId = 3;
    const rate = await request(app)
      .put(`/api/v1/products/${id}/ratings/${ratingId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        rate: 4,
        feedback: "can you make the product black ",
      });
    expect(rate.statusCode).toBe(200);
  });
  test("get a 401 status for updating a rating which isn't yours", async () => {
    const buyer = await request(app).post("/api/v1/users/login").send({
      email: "testBuyer@example.com",
      password: "default",
    });
    const { token } = buyer.body;
    const id = 1;
    const ratingId = 1;
    const rate = await request(app)
      .put(`/api/v1/products/${id}/ratings/${ratingId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        rate: 4,
        feedback: "can you make the product black ",
      });
    expect(rate.statusCode).toBe(401);
  });
  test("get a 404 status for updating a rating which isn't there", async () => {
    const buyer = await request(app).post("/api/v1/users/login").send({
      email: "testBuyer@example.com",
      password: "default",
    });
    const { token } = buyer.body;
    const id = 1;
    const ratingId = 6;
    const rate = await request(app)
      .put(`/api/v1/products/${id}/ratings/${ratingId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        rate: 4,
        feedback: "can you make the product black ",
      });
    expect(rate.statusCode).toBe(404);
  });
  afterAll(async () => {
    await Ratings.destroy({ where: { buyerId: 6 } });
  });
});
