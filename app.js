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

// var models = glob.sync(config.root + '/app/models/*.js');
// models.forEach(function (model) {
//   require(model);
// });

var roomModel = require('./app/models/room'),
    contactModel = require('./app/models/contact');


var homeCtrl  = require('./app/controllers/home'),
    castleCtrl  = require('./app/controllers/castle'),
    roomsCtrl  = require('./app/controllers/rooms'),
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

// roomModel.find({}).exec(function (err, rooms) {
//     app.locals.rooms = rooms;
// });


// Router
app.get('/', homeCtrl.get);

app.get('/castle/history', castleCtrl.getHistory);
app.get('/castle/site', castleCtrl.getSite);
app.get('/castle/activities', castleCtrl.getActivities);

app.get('/rooms', roomsCtrl.getRooms);
app.get('/room/:room', roomsCtrl.getRoom);
app.get('/cottage', roomsCtrl.getCottage);

app.get('/events', eventsCtrl.get);
app.get('/book', contactCtrl.get);
app.post('/book', contactCtrl.create);

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