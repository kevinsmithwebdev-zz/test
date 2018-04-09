const supertest = require('supertest')
const mongoose = require('mongoose')

require('../env')
const app = require('../app')
const db = require('../db')

const dataUnprotectedRoute = '/data/unprotected'
const dataProtectedRoute = '/data/protected'

describe('testing data routes', () => {
  let request = null
  let server = null
  beforeEach((done) => {
    server = app.listen(done)
    request = supertest.agent(server)
  })
  afterEach((done) => {
    server.close(done)
  })


  it(`GET ${dataUnprotectedRoute} always returns valid`, (done) => {
    request
    .get(dataUnprotectedRoute)
    .expect(200, { data: "Anyone can see uprotected route." })
    .end(done)
  })

  it(`GET from ${dataProtectedRoute} should fail without valid token`, (done) => {
    request
    .get(dataProtectedRoute)
    .expect(401)
    .end(done)
  })

  afterAll(() => db.close())
})
