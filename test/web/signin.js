'use strict'
const describe = require('mocha').describe
const it = require('mocha').it
const beforeEach = require('mocha').beforeEach
const hexi = require('hexi')
const passport = require('passport')
const signIn = require('../../app/web/signin')
const plugiator = require('plugiator')
const request = require('supertest')
const session = require('express-session')

describe('/signin', function () {
  let server
  let userService = {}
  let homepageURL = '/'

  beforeEach(function (next) {
    server = hexi()

    server.express.use(session({
      saveUninitialized: true,
      resave: true,
      secret: 'secret',
    }))
    server.express.use(passport.initialize())
    server.express.use(passport.session())

    server.register([
      { register: require('hexi-default') },
      { register: require('hexi-validate') },
      { register: require('hexi-vtree') },
      { register: plugiator.noop('user') },
      {
        register: plugiator.create('jimbo-client', server => {
          server.expose('user', userService)
        }),
      },
      { register: require('../../app/strategies/local') },
      {
        register: signIn,
        options: {
          homepageUrl: homepageURL,
        },
      },
    ])
    .then(next)
    .catch(next)
  })

  it('should return sign in page for guest user', function (done) {
    request(server.express)
      .get('/signin')
      .expect(200, done)
  })

  it('should authenticate user with correct credentials and redirect ' +
    'to homepage', function (done) {
    userService.authenticate = function (opts, cb) {
      cb(null, {
        id: '1',
        username: 'sherlock',
        email: 'sherlock@holmes.co.uk',
      })
    }

    request(server.express)
      .post('/signin')
      .send({
        username: 'sherlock',
        password: '123456',
      })
      .expect(302)
      .expect('location', homepageURL, done)
  })

  it('should authenticate user with correct credentials and redirect to ' +
    'next page', function (done) {
    userService.authenticate = function (opts, cb) {
      cb(null, {
        id: '1',
        username: 'sherlock',
        email: 'sherlock@holmes.co.uk',
      })
    }

    let nextPage = '/foo/bar?b=a'

    request(server.express)
      .post('/signin?next=' + encodeURIComponent(nextPage))
      .send({
        username: 'sherlock',
        password: '123456',
      })
      .expect(302)
      .expect('location', nextPage, done)
  })
})
