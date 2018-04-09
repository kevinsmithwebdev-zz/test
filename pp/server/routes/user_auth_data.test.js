const supertest = require('supertest')
const mongoose = require('mongoose')

const bodyParser = require('body-parser')

require('../env')

const app = require('../app')
const db = require('../db')

app._events.request.use(bodyParser.json())

const {
  loginSuccess,
  loginFailure,
  logoutSuccess,
  registerIncomplete,
  registerUsernameTaken,
  registerSuccess,
  registerServerError,
  checkjwtSuccess,
  deleteUserFailure,
  deleteUserSuccess
} = require('../../constants/api_msg')

const userRegisterRoute = '/user/register'
const userDeleteRoute   = '/user/delete'

const authLoginRoute    = '/auth/login'
const authLogoutRoute   = '/auth/logout'
const authCheckjwtRoute = '/auth/checkjwt'

describe('testing user and auth routes', () => {
  let request = null
  let server = null
  let retUser = {}
  let retToken = {}

  beforeEach((done) => {
    server = app.listen(done)
    request = supertest.agent(server)
  })

  afterEach((done) => {
    server.close(done)
  })

  const makeRandomString = num => {
    let text = ""
    const avail = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    for (let i=0; i<num; i++)
      text += avail.charAt(Math.floor(Math.random() * avail.length));
    return text
  }

  let fakeUser = {
    username: 'TEST_' + makeRandomString(12),
    password: makeRandomString(12),
    zipCode: makeRandomString(5)
  }
  let fakeUserBad = {
    ...fakeUser,
    password: makeRandomString(1),
  }

  const checkUser = (user) => {
    retUser = Object.assign({}, user)
    let isGood = retUser.username === fakeUser.username && retUser.zipCode === fakeUser.zipCode && retUser._id && !retUser.password && !retUser.hash && !retUser.salt

    if (!isGood)
      throw new Error("Invalid return body from register.")
    return isGood
  }

  //*************

  it(`POST ${userRegisterRoute} for new user succeeds`, (done) => {
    request
    .post(userRegisterRoute)
    .send(fakeUser)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect(registerSuccess.code)
    .expect(res => checkUser(res.body.user))
    .end(done)
  })

  it(`POST ${userRegisterRoute} for second user of same should fail`, (done) => {
    request
    .post(userRegisterRoute)
    .send(fakeUser)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect(registerUsernameTaken.code)
    .expect(res => {
      if (res.body.error.error !== registerUsernameTaken.message(fakeUser.username).error)
        throw new Error("Wrong message on duplicate username.")
    })
    .end(done)
  })

  it(`POST ${authLoginRoute} should fail with wrong password.`, (done) => {
    request
    .post(authLoginRoute)
    .send(fakeUserBad)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect(loginFailure.code)
    .expect(res => {
      if (!res.body.error || res.body.user || res.body.token)
        throw new Error("Wrong return body.")
    })
    .end(done)
  })

  it(`POST ${authLoginRoute} should succeed.`, (done) => {
    request
    .post(authLoginRoute)
    .send(fakeUser)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect(loginSuccess.code)
    .expect(res => {
      retToken = res.body.token
      if (res.body.error || !res.body.user || !res.body.token ||
          res.body.success!==loginSuccess.message(fakeUser, null).success)
        throw new Error("Wrong return body.")
    })
    .end(done)
  })

  it(`GET ${authCheckjwtRoute} should succeed with JWT.`, (done) => {
    request
    .get(authCheckjwtRoute)
    .set('Authorization', ('JWT ' + retToken))
    .expect(loginSuccess.code)
    .expect(res => {
      if (res.body.error || !res.body.user  ||
          res.body.success!==checkjwtSuccess.message(fakeUser).success)
        throw new Error("Wrong return body.")
    })
    .end(done)
  })

  it(`GET ${authLogoutRoute} should logout.`, (done) => {
    request
    .get(authLogoutRoute)
    .expect(logoutSuccess.code)
    .expect(res => {
      if (res.body.success!==logoutSuccess.message.success)
        throw new Error("Wrong return body.")
    })
    .end(done)
  })

  // wowsers - re login needed if implement JWT blacklist

  it(`DELETE ${userDeleteRoute} should fail w/o JWT.`, (done) => {
    request
    .delete(userDeleteRoute)
    .set('Authorization', ('JWT ' + 'nope'))
    .expect(deleteUserFailure.code)
    .expect(res => {
      if (res.body.error!==deleteUserFailure.message(fakeUser.username).error)
        throw new Error("Wrong return body.")
    })
    .end(done)
  })

  it(`DELETE ${userDeleteRoute} should succeed with JWT.`, (done) => {
    request
    .delete(userDeleteRoute)
    .set('Authorization', ('JWT ' + retToken))
    .expect(deleteUserSuccess.code)
    .expect(res => {
      if (res.body.success!==deleteUserSuccess.message(fakeUser.username).success)
        throw new Error("Wrong return body.")
    })
    .end(done)
  })




  afterAll(() => db.close())
})
