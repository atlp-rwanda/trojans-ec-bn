/* eslint-disable */
import request from "supertest";
import app from "../src/app";

describe("Product Expired", ()=>{
  test('Expire product for route', async()=>{
    const login = await request(app).post('/api/v1/users/login').send({
      email: 'admin123@gmail.com',
      password: 'admin123'
    })

    await request(app).patch(`/api/v1/products/${1}/expired`)
    .set("Authorization",  `Bearer ${login.body.token}`)
    .expect(200)

    //for bad request 
    await request(app).patch(`/api/v1/products/${0}/expired`)
    .set("Authorization",  `Bearer ${login.body.token}`)
    .expect(404)
  })
})

  