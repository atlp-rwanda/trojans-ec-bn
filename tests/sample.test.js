import app from "../src/app";
import request from "supertest";

describe("Testing the home route", () => {
  test("Get a status of 200", async () => {
    const response = await request(app).get("/home").send();
    expect(response.statusCode).toBe(200);
  });
});
