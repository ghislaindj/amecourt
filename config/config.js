var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'amecourt'
    },
    port: 3000,
    db: 'mongodb://localhost/amecourt-development'

  },

  staging: {
    root: rootPath,
    app: {
      name: 'amecourt'
    },
    port: 3000,
    db: 'mongodb://localhost/amecourt-staging'

  },

  production: {
    root: rootPath,
    app: {
      name: 'amecourt'
    },
    port: 3000,
    db: 'mongodb://localhost/amecourt-production'

  }
};

module.exports = config[env];
