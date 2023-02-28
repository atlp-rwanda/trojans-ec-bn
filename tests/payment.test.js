import request from "supertest";
import app from "../src/app";

describe("Testing payment", () => {
  test("Get a status of 200", async () => {
    const login = await request(app).post("/api/v1/users/login").send({
      email: "test1234@example.com",
      password: "default123",
    });
    await request(app)
      .post("/api/v1/carts/1")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send();

    const response = await request(app)
      .post("/api/v1/payment/checkout")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send();
    expect(response.status).toBe(200);

    const res = await request(app)
      .get(
        `/api/v1/payment/success-callback?token=${response.body.token}&&paymentId=${response.body.paymentId}`
      )
      .send();
    expect(res.status).toBe(200);

    const resCancel = await request(app)
      .get(`/api/v1/payment/cancel-callback?token=${response.body.token}`)
      .send();
    expect(resCancel.status).toBe(200);
  });
});
