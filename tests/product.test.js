/* eslint-disable */
import request from "supertest";
import app from "../src/app";

describe("Product Expired", ()=>{
  test('Expire product for route', async()=>{
    const login = await request(app).post('/api/v1/users/login').send({
      email: 'admin123@gmail.com',
      password: 'admin123'
    })

    await request(app).patch(`/api/v1/products/${2}/expired`)
    .set("Authorization",  `Bearer ${login.body.token}`)
    .expect(200)

    await request(app).patch(`/api/v1/products/${1}/expired`)
    .set("Authorization",  `Bearer ${login.body.token}`)
    .expect(409)

  })
});

describe("provide feedback on a product", ()=>{
  test('getting a 200 for providing a rate/feedback on a product',async ()=>{
    const login = await request(app).post('/api/v1/users/login').send({
      email: 'testBuyer@example.com',
      password: 'default'
    });
    const response = await request(app).post(`/api/v1/users/${1}/feedback`)
    .set("Authorization", `Bearer ${login.body.token}`)
    
  })
})

  