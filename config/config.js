var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    secret = require('./secret.js'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'amecourt'
    },
    port: 3000,
    db: 'mongodb://localhost/amecourt-development',
    publicUrl: 'http://localhost:3000',
    mailer: {
      auth: {
        user: secret.mandrill.user,
        pass: secret.mandrill.password,
      },
      defaultFromAddress: 'Tech Amecourt <tech@chateau-amecourt.com>',
      defaultToAddress: 'tech@chateau-amecourt.com'
    }
  },

  staging: {
    root: rootPath,
    app: {
      name: 'amecourt'
    },
    port: 3100,
    db: 'mongodb://localhost/amecourt-staging',
    publicUrl: 'http://www.chateau-amecourt.com',
    mailer: {
      auth: {
        user: secret.mandrill.user,
        pass: secret.mandrill.password,
      },
      defaultFromAddress: 'Tech Amecourt <tech@chateau-amecourt.com>',
      defaultToAddress: 'tech@chateau-amecourt.com'
    }
  }
};

module.exports = config[env];