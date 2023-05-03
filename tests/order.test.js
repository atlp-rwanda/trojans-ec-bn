/* eslint-disable */
import request from "supertest";
import app from "../src/app";
import httpServer from "http";
import { ioConnect } from "../src/utils/socketio";

const http = httpServer.Server(app);
ioConnect(http);

const { Order } = require("../src/database/models")

describe("testing order routes", () => {
      test("Getting order as buyer", async () => {
        const order = await Order.findOne({ where: { BuyerId: 6 }})
         const login = await  request(app).post("/api/v1/users/login").send({
            email: "testBuyer@example.com",
            password: "default",
         });
         const allOrders = await request(app)
         .get("/api/v1/orders")
         .set("Authorization", `Bearer ${login.body.token}`);
         expect(allOrders.statusCode).toBe(200);
         
         const singleOrder = await request(app)
         .get("/api/v1/orders/" + order.id )
         .set("Authorization", `Bearer ${login.body.token}`);
         expect(singleOrder.statusCode).toBe(200);
      });
      test("Getting order as admin", async () => {
         const order = await Order.findOne();
         const login = await request(app).post("/api/v1/users/login").send({
            email: "admin123@gmail.com",
            password: "admin123",
         });
         const allOrders = await request(app)
         .get("/api/v1/orders")
         .set("Authorization", `Bearer ${login.body.token}`);
         expect(allOrders.statusCode).toBe(200);
         
         const singleOrder = await request(app)
         .get("/api/v1/orders/" + order.id )
         .set("Authorization", `Bearer ${login.body.token}`);
         expect(singleOrder.statusCode).toBe(200);
         
        const updateorder = await request(app).patch("/api/v1/orders/" + order.id)
         .set("Authorization", `Bearer ${login.body.token}`)
         .send({
            status: "delivered",
            deliveredDate: "02/05/2023"
         });
         expect(updateorder.statusCode).toBe(200)
      });
      test("update order status getting 500", async () => {
         const order = await Order.findOne();
         const login = await request(app).post("/api/v1/users/login").send({
            email: "admin123@gmail.com",
            password: "admin123",
         });
         jest
         .spyOn(Order, "update")
         .mockImplementation(
            jest.fn().mockRejectedValue(new Error("Database error"))
         );
         await request(app).patch("/api/v1/orders/" + order.id)
         .set("Authorization", `Bearer ${login.body.token}`)
         .send({
            status: "delivered",
            deliveredDate: "02/09/2023"
         })
         .expect(500);
         
      });
      test("get 400 for order validation", async () => {
        const order = await Order.findOne();
        const login = await request(app).post("/api/v1/users/login").send({
           email: "admin123@gmail.com",
           password: "admin123",
        });
        await request(app).patch("/api/v1/orders/" + order.id)
        .set("Authorization", `Bearer ${login.body.token}`)
        .send({
           status: "delive",
           deliveredDate: "02/"
        })
        .expect(400);

      });
      test("get 400 for order does not exist", async () => {
         const login = await request(app).post("/api/v1/users/login").send({
            email: "admin123@gmail.com",
            password: "admin123",
         });
         await request(app)
         .get(`/api/v1/orders/${2383832923}`)
         .set("Authorization", `Bearer ${login.body.token}`);
         expect(400);
      });
      test("Getting single order as admin giving  500", async () =>{
        const order = await Order.findOne();
        const login = await request(app).post("/api/v1/users/login").send({
            email: "admin123@gmail.com",
            password: "admin123",
         });
         jest
         .spyOn(Order, "findOne")
         .mockImplementation(
            jest.fn().mockRejectedValue(new Error("Database error"))
         );
         const singleOrder = await request(app)
         .get("/api/v1/orders/" + order.id )
         .set("Authorization", `Bearer ${login.body.token}`);
         expect(singleOrder.statusCode).toBe(500);

      });
      test("Getting single order as buyer giving  500", async () =>{
         const order = await Order.findOne();
         const login = await  request(app).post("/api/v1/users/login").send({
            email: "testBuyer@example.com",
            password: "default",
         });
          jest
          .spyOn(Order, "findOne")
          .mockImplementation(
             jest.fn().mockRejectedValue(new Error("Database error"))
          );
          const singleOrder = await request(app)
          .get("/api/v1/orders/" + order.id )
          .set("Authorization", `Bearer ${login.body.token}`);
          expect(singleOrder.statusCode).toBe(500);
 
       });
      test("Getting all order giving a 500", async () => {
        const login = await request(app).post("/api/v1/users/login").send({
            email: "admin123@gmail.com",
            password: "admin123",
         });
         jest
          .spyOn(Order, "findAll")
          .mockImplementation(
            jest.fn().mockRejectedValue(new Error("Database error"))
          );
          const getOrder = await request(app)
          .get("/api/v1/orders")
          .set("Authorization", `Bearer ${login.body.token}`);
          expect(getOrder.statusCode).toBe(500)
      });
});

