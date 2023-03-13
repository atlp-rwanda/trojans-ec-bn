/* eslint-disable */
import request from "supertest";
import app from "../src/app";

describe("Sale belongs to order", ()=>{
  test('get 200 for change sale status', async()=>{
    const login = await request(app).post('/api/v1/users/login').send({
      email: 'testSeller@example.com',
      password: 'default'
    })

    await request(app).patch(`/api/v1/sales/${3}`)
    .set("Authorization",  `Bearer ${login.body.token}`)
    .send({
        Status: "delivered"
    })
    .expect(200)
  })

  test('get 400 for sale not exist', async()=>{
    const login = await request(app).post('/api/v1/users/login').send({
      email: 'testSeller@example.com',
      password: 'default'
    })

    await request(app).patch(`/api/v1/sales/${12345664}`)
    .set("Authorization",  `Bearer ${login.body.token}`)
    .send({
        Status: "delivered"
    })
    .expect(400)
  })

  test('get 403 for sale you are not belong to', async()=>{
    const login = await request(app).post('/api/v1/users/login').send({
      email: 'testSeller@example.com',
      password: 'default'
    })

    await request(app).patch(`/api/v1/sales/${1}`)
    .set("Authorization",  `Bearer ${login.body.token}`)
    .send({
        Status: "delivered"
    })
    .expect(403)
  })

  test('get 400 for sale validation', async()=>{
    const login = await request(app).post('/api/v1/users/login').send({
      email: 'testSeller@example.com',
      password: 'default'
    })
    await request(app).patch(`/api/v1/sales/${3}`)
    .set("Authorization",  `Bearer ${login.body.token}`)
    .send({
        Status: "delivd"
    })
    .expect(400)
  })

})

  