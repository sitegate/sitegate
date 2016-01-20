'use strict'
process.on('uncaughtException', function (err) {
  console.log('An uncaught exception happened.')
  console.log(err)
})

process.on('unhandledRejection', function (reason, p) {
  console.log('Possibly Unhandled Rejection at: Promise ', p, ' reason: ',
    reason)
})

const config = require('./config/config')
const hexi = require('hexi')
const plugiator = require('plugiator')
require('./config/i18n')

if (config.get('env') === 'development') {
  require('./config/setup-root')
}

const server = hexi()

server.register([
  {
    register: require('hexi-default'),
  },
  {
    register: require('./config-express'),
    options: {
      sessionSecret: config.get('session.secret'),
    },
  },
  { register: require('jimbo-client') },
  // registering microservices
  {
    register: require('./app/plugins/client'),
    options: {
      amqpURL: config.get('amqpURI'),
    },
  },
  {
    register: require('./app/plugins/user'),
    options: {
      amqpURL: config.get('amqpURI'),
    },
  },
  {
    register: require('./app/plugins/oauth'),
    options: {
      amqpURL: config.get('amqpURI'),
    },
  },
  { register: require('./app/strategies/client-password') },
  { register: require('./app/strategies/local') },
  {
    register: require('./app/strategies/facebook'),
    options: config.get('provider.facebook'),
  },
  {
    register: require('./app/strategies/twitter'),
    options: config.get('provider.twitter'),
  },
  {
    register: require('./app/strategies/google'),
    options: config.get('provider.google'),
  },
  {
    register: require('hexi-auth'),
  },
  {
    register: require('hexi-validate'),
  },
  { register: plugiator.create({
      name: 'hexi-default-auth',
      //dependencies: ['hexi-auth'],
    }, (server, opts) => {
      server.auth((req, res, next) => {
        if (req.isAuthenticated && req.isAuthenticated()) {
          return next()
        }

        let redirectTo = '/signin'
        if (!(req.route && req.route.settings && req.route.settings.plugins &&
          req.route.settings.plugins.humbleAuth &&
          req.route.settings.plugins.humbleAuth.appendNext === false)) {
          if (redirectTo.indexOf('?') !== -1) {
            redirectTo += '&'
          } else {
            redirectTo += '?'
          }

          redirectTo += 'next=' + encodeURIComponent(req.url)
        }
        res.redirect(redirectTo)
      })
    }),
  },
  { register: require('hexi-vtree') },
  {
    register: plugiator.create({
      name: 'pre-user',
    }, (server, opts) => {
      let userService = server.plugins.jimboClient.user

      server.route.pre((next, opts) => {
        if (!opts.config.loadUser) return next.applySame()

        opts.pre.push((req, res, next) => {
          if (!req.user || !req.user.id) {
            return res.send('session not defined')
          }

          userService.getById({id: req.user.id}, (err, user) => {
            if (err) {
              return res.send('user not found')
            }
            req.pre = req.pre || {}
            req.pre.user = user
            next()
          })
        })
        return next(opts)
      })
    }),
  },
])
.then(() => {
  return server.register([
    {
      register: require('./app/web/signin'),
      options: {
        homepageUrl: config.get('app.homepageUrl'),
      },
    },
    {
      register: require('./app/web/signup'),
      options: {
        homepageUrl: config.get('app.homepageUrl'),
      },
    },
    { register: require('./app/web/reset-password') },
    { register: require('./app/web/home') },
    { register: require('./app/web/email') },
    { register: require('./app/web/settings/profile') },
    { register: require('./app/web/settings/accounts') },
    { register: require('./app/web/settings/password') },
    { register: require('./app/web/application') },
    { register: require('./app/web/user-info') },
    { register: require('./app/web/public') },
    {
      register: require('./app/plugins/auth/auth'),
      options: {
        provider: config.get('provider'),
      },
    },
    {
      register: plugiator.create('404', (server, opts) => {
        let app = server.express

        app.use((req, res, next) => {
          const err = new Error('Not Found')
          err.status = 404
          next(err)
        })

        if (config.get('env') === 'development') {
          app.use((err, req, res, next) => {
            res.status(err.status || 500)
            res.render('error', {
              message: err.message,
              error: err,
              title: 'error',
            })
          })
        }

        app.use((err, req, res, next) => {
          res.status(err.status || 500)
          res.render('error', {
            message: err.message,
            error: {},
            title: 'error',
          })
        })
      }),
    },
  ])
})
.then(() => server.express.listen(config.get('port')))
.then(() => console.log('Server running at:', config.get('port')/*, server.info.uri*/))
.catch(err => console.error(err))
