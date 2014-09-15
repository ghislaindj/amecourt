var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose')
  auth = require('./helpers/auth');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var homeCtrl  = require('./app/controllers/home'),
    loginCtrl = require('./app/controllers/login'),
    adminCtrl = require('./app/controllers/admin');

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});
var app = express();

require('./config/express')(app, config);

// Router

app.get('/', homeCtrl.get);

app.get('/admin', auth.private, adminCtrl.get);

app.get('/login', loginCtrl.get);

app.post('/login', loginCtrl.post);

app.get('/logout', function(req, res) {
    res.writeHead(302, {
        'Set-Cookie': 'access_token=""',
        'Content-Type': 'text/plain',
        'Location': '/'
    });
    res.end();
});


app.listen(config.port);