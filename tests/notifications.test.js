import request from "supertest";
import app from "../src/app";
import { Notification } from "../src/database/models";

describe("Testing notifications routes", () => {
  let token;
  beforeAll(async () => {
    const login = await request(app).post("/api/v1/users/login").send({
      email: "admin123@gmail.com",
      password: "admin123",
    });
    token = login.body.token;
  });
  describe("Testing get route", () => {
    test("Test success in getting all loggedin user notifications", async () => {
      const res = await request(app)
        .get("/api/v1/notifications")
        .set("Authorization", `Bearer ${token}`)
        .send();
      expect(res.statusCode).toBe(200);
    });

    test("Test server error while getting all loggedin user notifications", async () => {
      jest
        .spyOn(Notification, "findAll")
        .mockImplementation(
          jest.fn().mockRejectedValue(new Error("Database error"))
        );
      const res = await request(app)
        .get("/api/v1/notifications")
        .set("Authorization", `Bearer ${token}`)
        .send();
      expect(res.statusCode).toBe(500);
    });
  });

  describe("Testing delete route", () => {
    test("Test success delete loggedin user notification", async () => {
      const res = await request(app)
        .delete(`/api/v1/notifications/1`)
        .set("Authorization", `Bearer ${token}`)
        .send();
      expect(res.statusCode).toBe(202);
    });

    test("Test forbidden delete loggedin user notification", async () => {
      const res = await request(app)
        .delete(`/api/v1/notifications/2`)
        .set("Authorization", `Bearer ${token}`)
        .send();
      expect(res.statusCode).toBe(403);
    });

    test("Test not found delete loggedin user notification", async () => {
      const res = await request(app)
        .delete(`/api/v1/notifications/0`)
        .set("Authorization", `Bearer ${token}`)
        .send();
      expect(res.statusCode).toBe(404);
    });

    test("Test server error while deleting loggedin user notification", async () => {
      jest
        .spyOn(Notification, "findOne")
        .mockImplementation(
          jest.fn().mockRejectedValue(new Error("Database error"))
        );

      jest
        .spyOn(Notification, "destroy")
        .mockImplementation(
          jest.fn().mockRejectedValue(new Error("Database error"))
        );
      const res = await request(app)
        .delete("/api/v1/notifications/3")
        .set("Authorization", `Bearer ${token}`)
        .send();
      expect(res.statusCode).toBe(500);
    });
  });
});

describe("Tests for Marking Notification", () => {
  let token;
  beforeAll(async () => {
    const login = await request(app).post("/api/v1/users/login").send({
      email: "admin123@gmail.com",
      password: "admin123",
    });
    token = login.body.token;
  });
  test("Testing marking one Notification as read", async () => {
    const res = await request(app)
      .post("/api/v1/notifications/3")
      .set("Authorization", `Bearer ${token}`)
      .send();
    expect(res.statusCode).toBe(200);
  });
  test("Testing an already marked notification", async () => {
    const res = await request(app)
      .post("/api/v1/notifications/3")
      .set("Authorization", `Bearer ${token}`)
      .send();
    expect(res.statusCode).toBe(207);
  });
  test("Testing marking one Notification", async () => {
    const res = await request(app)
      .post("/api/v1/notifications/1000")
      .set("Authorization", `Bearer ${token}`)
      .send();
    expect(res.statusCode).toBe(404);
  });

  test("Testing Already marked notifications", async () => {
    const res = await request(app)
      .post("/api/v1/notifications")
      .set("Authorization", `Bearer ${token}`)
      .send();
    expect(res.statusCode).toBe(207);
  });
});
