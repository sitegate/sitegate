'use strict'
const config = require('./config/config')

const manifest = {
  server: {
    debug: {
      log: ['error'],
      request: ['error'],
    },
  },
  connections: [
    {
      port: config.get('port'),
    },
  ],
  registrations: [
    { plugin: 'jimbo-client' },
    // registering microservices
    {
      plugin: {
        register: './app/plugins/client',
        options: {
          amqpURL: config.get('amqpURI'),
        },
      },
    },
    {
      plugin: {
        register: './app/plugins/user',
        options: {
          amqpURL: config.get('amqpURI'),
        },
      },
    },
    {
      plugin: {
        register: './app/plugins/session',
        options: {
          amqpURL: config.get('amqpURI'),
        },
      },
    },
    {
      plugin: {
        register: './app/plugins/oauth',
        options: {
          amqpURL: config.get('amqpURI'),
        },
      },
    },
    {
      plugin: {
        register: 'humble-session',
        options: {
          password: config.get('session.secret'),
          cookie: 'sid-sg', // cookie name to use, usually sid-<appname>
          isSecure: config.get('session.secure'),
          sessionStoreName: 'session',
        },
      },
    },
    { plugin: 'humble-auth' },
    { plugin: 'humble-flash' },
    { plugin: 'hapi-auth-bearer-token' },
    { plugin: 'hapi-auth-basic' },
    { plugin: 'hapi-auth-form' },
    { plugin: 'bell' },
    {
      plugin: {
        register: './app/plugins/auth/auth',
        options: {
          provider: config.get('provider'),
          session: config.get('session'),
          isSecure: config.get('session.secure'),
        },
      },
    },
    { plugin: 'humble-oauth2orize' },
    { plugin: './app/plugins/oauth2' },
    { plugin: 'hapi-vtree' },
    { plugin: 'inert' },
    {
      plugin: {
        register: './app/web/signin',
        options: {
          homepageUrl: config.get('app.homepageUrl'),
        },
      },
    },
    {
      plugin: {
        register: './app/web/signup',
        options: {
          homepageUrl: config.get('app.homepageUrl'),
        },
      },
    },
    { plugin: './app/web/reset-password' },
    { plugin: './app/web/home' },
    { plugin: './app/web/public' },
    { plugin: './app/web/email' },
    { plugin: './app/web/settings/profile' },
    { plugin: './app/web/settings/accounts' },
    { plugin: './app/web/settings/password' },
    { plugin: './app/web/application' },
    { plugin: './app/web/user-info' },
  ],
}

module.exports = manifest
