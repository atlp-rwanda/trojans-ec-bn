import app from "../src/app";
import request from "supertest";


const randomNo =  Math.floor(Math.random() * 9000000)

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
      email:"test123@gmail.com",
      password:"test12345"
    });
    expect(response.statusCode).toBe(400);
  });
  test("Get a status of 200", async () => {
    
    const response = await request(app).post("/signup").send({
      name:"test",
      email:"test1234"+randomNo+"@gmail.com",
      password:"test12345"
    });
    expect(response.statusCode).toBe(201);
  });
  test("Get a status of 409", async () => {
    
    const response = await request(app).post("/signup").send({
      name:"test",
      email:"test1234"+randomNo+"@gmail.com",
      password:"test12345"
    });
    expect(response.statusCode).toBe(409);
  });
});

