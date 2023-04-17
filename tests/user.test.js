/* eslint-disable */
import request from "supertest";
import app from "../src/app";

describe("Getting user", ()=>{
    test("get Sales", async()=>{
        const login = await request(app).post('/api/v1/users/login').send({
          email: 'testBuyer@example.com',
          password: 'default'
        })
    
        await request(app).get(`/api/v1/users/profile`)
        .set("Authorization",  `Bearer ${login.body.token}`)
        .expect(200)
    })
})