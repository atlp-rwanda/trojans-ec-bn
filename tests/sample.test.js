import app from "../src/app";
import request from "supertest";

describe("Testing home route", () => {
  test("Get a 200 on home route", async () => {
    const response = await request(app).get("/home").send();
    expect(response.statusCode).toBe(200);
  });
});
