'use strict';

var util = require('util');
var fs = require('fs');
var yamlOrJSON = require('yaml-or-json');
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
  mainJS: {
    doc: 'The URL of the main JS of the website',
    format: 'url',
    default: 'https://localhost:1770/index.js',
    env: 'MAIN_JS'
  },
  amqp: {
    login: {
      doc: 'AMQP login.',
      default: 'guest'
    },
    password: {
      doc: 'AMQP password.',
      default: 'guest'
    },
    address: {
      doc: 'AMQP address.',
      default: 'localhost',
      env: 'RABBITMQ_PORT_5672_TCP_ADDR'
    },
    port: {
      doc: 'AMQP port.',
      format: 'port',
      default: '5672',
      env: 'RABBITMQ_PORT_5672_TCP_PORT'
    }
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
  provider: {
    facebook: {
      clientId: {
        doc: 'Facebook App ID.',
        default: '391179464377243',
        env: 'FACEBOOK_ID'
      },
      clientSecret: {
        doc: 'Facebook App secret.',
        default: 'edfafc7715060f8cb4c7212833a3c87a',
        env: 'FACEBOOK_SECRET'
      }
    },
    twitter: {
      clientId: {
        doc: 'Twitter App ID.',
        default: 'j5UFdNnFLv6t24syOiDglfRIX',
        env: 'TWITTER_KEY'
      },
      clientSecret: {
        doc: 'Twitter App secret',
        default: 'GZMmhyaUcsaQULXQknfmXCEh8KTG91UGBeQED19ASvhsaDO7Ba',
        env: 'TWITTER_SECRET'
      }
    },
    google: {
      clientId: {
        doc: 'Google App ID.',
        default: '',
        env: 'GOOGLE_ID'
      },
      clientSecret: {
        doc: 'Google App secret',
        default: 'rcBTWhsCnytAl6bXr3iTnjPs',
        env: 'GOOGLE_SECRET'
      },
      location: {
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
  },
  userService: {
    mongodb: {
      address: {
        doc: 'MongoDB address.',
        default: 'localhost',
        env: 'MONGO_PORT_27017_TCP_ADDR'
      },
      port: {
        doc: 'MongoDB port.',
        format: 'port',
        default: '27017',
        env: 'MONGO_PORT_27017_TCP_PORT'
      },
      name: {
        doc: 'MongoDB DB name.',
        default: 'sitegate-user-dev'
      }
    }
  },
  clientService: {
    mongodb: {
      address: {
        doc: 'MongoDB address.',
        default: 'localhost',
        env: 'CLIENT_MONGO_PORT_27017_TCP_ADDR'
      },
      port: {
        doc: 'MongoDB port.',
        format: 'port',
        default: '27017',
        env: 'CLIENT_MONGO_PORT_27017_TCP_PORT'
      },
      name: {
        doc: 'MongoDB DB name.',
        default: 'sitegate-user-dev'
      }
    }
  },
  oauthService: {
    mongodb: {
      address: {
        doc: 'MongoDB address.',
        default: 'localhost',
        env: 'OAUTH_MONGO_PORT_27017_TCP_ADDR'
      },
      port: {
        doc: 'MongoDB port.',
        format: 'port',
        default: '27017',
        env: 'OAUTH_MONGO_PORT_27017_TCP_PORT'
      },
      name: {
        doc: 'MongoDB DB name.',
        default: 'sitegate-user-dev'
      }
    }
  },
  sessionService: {
    mongodb: {
      address: {
        doc: 'MongoDB address.',
        default: 'localhost',
        env: 'SESSION_MONGO_PORT_27017_TCP_ADDR'
      },
      port: {
        doc: 'MongoDB port.',
        format: 'port',
        default: '27017',
        env: 'SESSION_MONGO_PORT_27017_TCP_PORT'
      },
      name: {
        doc: 'MongoDB DB name.',
        default: 'sitegate-user-dev'
      }
    }
  },
  mailerService: {
    mailer: {
      from: {
        default: '',
        env: 'MAILER_FROM'
      },
      options: {
        service: {
          default: '',
          env: 'MAILER_SERVICE_PROVIDER'
        },
        auth: {
          user: {
            default: '',
            env: 'MAILER_EMAIL_ID'
          },
          pass: {
            default: '',
            env: 'MAILER_PASSWORD'
          }
        }
      }
    }
  }
});

// load environment dependent configuration
var env = config.get('env');
var filePath = __dirname + '/env/' + env;
var configFile = yamlOrJSON(filePath);

config.load(configFile);

// Adding the calculated values
config.load({
  amqpUrl: util.format(
    'amqp://%s:%s@%s:%s',
    config.get('amqp.login'),
    config.get('amqp.password'),
    config.get('amqp.address'),
    config.get('amqp.port')
  ),
  userServiceMongodbUrl: util.format(
    'mongodb://%s:%s/%s',
    config.get('userService.mongodb.address'),
    config.get('userService.mongodb.port'),
    config.get('userService.mongodb.name')
  ),
  clientServiceMongodbUrl: util.format(
    'mongodb://%s:%s/%s',
    config.get('clientService.mongodb.address'),
    config.get('clientService.mongodb.port'),
    config.get('clientService.mongodb.name')
  ),
  oauthServiceMongodbUrl: util.format(
    'mongodb://%s:%s/%s',
    config.get('oauthService.mongodb.address'),
    config.get('oauthService.mongodb.port'),
    config.get('oauthService.mongodb.name')
  ),
  sessionServiceMongodbUrl: util.format(
    'mongodb://%s:%s/%s',
    config.get('sessionService.mongodb.address'),
    config.get('sessionService.mongodb.port'),
    config.get('sessionService.mongodb.name')
  )
});

// perform validation
config.validate();

module.exports = config;
