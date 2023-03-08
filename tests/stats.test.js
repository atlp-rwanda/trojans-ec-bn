/* eslint-disable */
import request from 'supertest'
import app from '../src/app'

describe('Testing Statistics', () => {
  test('statistics Test', async () => {
    const login = await request(app).post('/api/v1/users/login').send({
      email: 'testSeller@example.com',
      password: 'default',
    })

    await request(app)
      .get(`/api/v1/products/stats`)
      .set('Authorization', `Bearer ${login.body.token}`)
      .expect(200)
  })
})
