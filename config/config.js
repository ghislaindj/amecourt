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
    mailer: {
      auth: {
        user: secret.mandrill.user,
        pass: secret.mandrill.password,
      },
      defaultFromAddress: 'Tech Amecourt <tech@chateau-amecourt.com>'
    }
  },

  staging: {
    root: rootPath,
    app: {
      name: 'amecourt'
    },
    port: 3100,
    db: 'mongodb://localhost/amecourt-staging',
    mailer: {
     auth: {
       user: 'test@example.com',
       pass: 'secret',
     },
     defaultFromAddress: 'First Last <test@examle.com>'
   }
  }
};

module.exports = config[env];
