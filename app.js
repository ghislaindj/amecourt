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

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});

var homeCtrl  = require('./app/controllers/home'),
    castleCtrl  = require('./app/controllers/castle'),
    bnbCtrl  = require('./app/controllers/bnb'),
    cottageCtrl  = require('./app/controllers/cottage'),
    activitiesCtrl  = require('./app/controllers/activities'),
    eventsCtrl  = require('./app/controllers/events'),
    contactCtrl  = require('./app/controllers/contact'),
    loginCtrl = require('./app/controllers/login'),
    adminCtrl = require('./app/controllers/admin');

var app = express();

require('./config/express')(app, config);

require('formage').init(app, express, mongoose.models, {
    title: 'Backoffice',
    root: '/backoffice',
    default_section: 'Gestion du site',
    username: 'admin',
    password: 'admin',
    admin_users_gui: false
});


// Router
app.get('/', homeCtrl.get);

app.get('/chateau', castleCtrl.get);
app.get('/chambres-d-hote', bnbCtrl.get);
app.get('/gite', cottageCtrl.get);
app.get('/activites', activitiesCtrl.get);
app.get('/evenements', eventsCtrl.get);
app.get('/reserver', contactCtrl.get);
app.post('/reserver', contactCtrl.create);

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