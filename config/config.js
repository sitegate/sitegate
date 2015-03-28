'use strict';

var convict = require('convict');

var config = convict({
  env: {
    doc: 'The applicaton environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  app: {
    title: {
      doc: 'The title of the App.',
      default: 'SiteGate'
    }
  },
  db: {
    doc: 'MongoDB endpoint.',
    format: function (val) {
      if (val.toLowerCase().indexOf('mongodb://') !== 0) {
        throw new TypeError('Should be a MongoDB endpoint');
      }
    },
    default: 'mongodb://localhost/sitegate-dev',
    env: 'DB'
  },
  amqpURL: {
    doc: 'AMQP endpoint.',
    default: 'amqp://guest:guest@localhost:5672',
    env: 'AMQP_URL'
  },
  port: {
    doc: 'The port to bind',
    format: 'port',
    default: 3000,
    env: 'PORT'
  },
  session: {
    secret: {
      doc: 'Session secret.',
      default: 'siteGateApp',
      env: 'SESSION_SECRET'
    },
    collection: {
      doc: 'Session collection',
      default: 'sessions',
      env: 'SESSION_COLLECTION'
    }
  },
  sitegateClient: {
    domain: {
      format: 'url',
      default: 'http://sitegatedev.com:3001'
    },
    privateHomepage: {
      default: '/'
    },
    publicHomepage: {
      default: '/'
    }
  },
  facebook: {
    clientID: {
      doc: 'Facebook App ID.',
      default: '391179464377243',
      env: 'FACEBOOK_ID'
    },
    clientSecret: {
      doc: 'Facebook App secret.',
      default: 'edfafc7715060f8cb4c7212833a3c87a',
      env: 'FACEBOOK_SECRET'
    },
    callbackURL: {
      doc: 'Facebook callback URL.',
      format: 'url',
      default: 'https://account.sitegatedev.com:3000/auth/facebook/callback',
      env: 'FACEBOOK_CALLBACK'
    }
  },
  twitter: {
    clientID: {
      doc: 'Twitter App ID.',
      default: 'j5UFdNnFLv6t24syOiDglfRIX',
      env: 'TWITTER_KEY'
    },
    clientSecret: {
      doc: 'Twitter App secret',
      default: 'GZMmhyaUcsaQULXQknfmXCEh8KTG91UGBeQED19ASvhsaDO7Ba',
      env: 'TWITTER_SECRET'
    },
    callbackURL: {
      doc: 'Twitter callback URL.',
      format: 'url',
      default: 'https://account.sitegatedev.com:3000/auth/twitter/callback',
      env: 'TWITTER_CALLBACK'
    }
  },
  google: {
    clientID: {
      doc: 'Google App ID.',
      default: '295363747259-4f4o7483ce5q74a6v31n05s23ke37dii.apps.googleusercontent.com',
      env: 'GOOGLE_ID'
    },
    clientSecret: {
      doc: 'Google App secret',
      default: 'rcBTWhsCnytAl6bXr3iTnjPs',
      env: 'GOOGLE_SECRET'
    },
    callbackURL: {
      doc: 'Google callback URL.',
      format: 'url',
      default: 'https://account.sitegatedev.com:3000/auth/google/callback',
      env: 'GOOGLE_CALLBACK'
    }
  },
  linkedin: {
    clientID: {
      doc: 'Linkedin App ID.',
      default: 'APP_ID',
      env: 'LINKEDIN_ID'
    },
    clientSecret: {
      doc: 'Linkedin App secret',
      default: 'APP_SECRET',
      env: 'LINKEDIN_SECRET'
    },
    callbackURL: {
      doc: 'Linkedin callback URL.',
      format: 'url',
      default: 'https://account.sitegatedev.com:3000/auth/linkedin/callback',
      env: 'LINKEDIN_CALLBACK'
    }
  },
  github: {
    clientID: {
      doc: 'GitHub App ID.',
      default: 'APP_ID',
      env: 'GITHUB_ID'
    },
    clientSecret: {
      doc: 'GitHub App secret',
      default: 'APP_SECRET',
      env: 'GITHUB_SECRET'
    },
    callbackURL: {
      doc: 'GitHub callback URL.',
      format: 'url',
      default: 'https://account.sitegatedev.com:3000/auth/github/callback',
      env: 'GITHUB_CALLBACK'
    }
  }
});

// load environment dependent configuration
var env = config.get('env');
config.loadFile('./config/env/' + env + '.json');

// perform validation
config.validate();

module.exports = config;