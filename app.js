var express = require('express'),
    config = require('./config/config'),
    glob = require('glob'),
    mongoose = require('mongoose'),
    initializer = require('./helpers/initializer'),
    auth = require('./helpers/auth'),
    sm = require('sitemap');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.db);
});

// var roomModel = require('./app/models/room'),
//     contactModel = require('./app/models/contact');

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});


var homeCtrl  = require('./app/controllers/home'),
    castleCtrl  = require('./app/controllers/castle'),
    roomsCtrl  = require('./app/controllers/rooms'),
    eventsCtrl  = require('./app/controllers/events'),
    picturesCtrl  = require('./app/controllers/pictures'),
    weddingsCtrl  = require('./app/controllers/weddings'),
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


initializer.start(app);

// Router
app.get('/', homeCtrl.get);

app.get('/castle/history', castleCtrl.getHistory);
app.get('/castle/site', castleCtrl.getSite);
app.get('/castle/bikes', castleCtrl.getBikes);

app.get('/rooms', roomsCtrl.getRooms);
app.get('/room/:room', roomsCtrl.getRoom);

app.get('/events', eventsCtrl.get);
app.get('/weddings', weddingsCtrl.get);
app.get('/pictures', picturesCtrl.get);

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

// Custom URL for sitemaps

var urls = [
        { url: '/',  changefreq: 'daily', priority: 0.3 },
        { url: '/castle/history',  changefreq: 'daily', priority: 0.3 },
        { url: '/castle/history', changefreq: 'daily', priority: 0.3 },
        { url: '/castle/site', changefreq: 'daily', priority: 0.3 },
        { url: '/castle/activities', changefreq: 'daily', priority: 0.3 },
        { url: '/castle/bikes', changefreq: 'daily', priority: 0.3 },
        { url: '/rooms', changefreq: 'daily', priority: 0.3 },
        { url: '/events', changefreq: 'daily', priority: 0.3 },
        { url: '/book', changefreq: 'daily', priority: 0.3 }
    ];

[1, 2, 3, 4].forEach(function(roomId) {
    urls.push({url: '/room/'+roomId,  changefreq: 'daily', priority: 0.3});
})

// Cities

var citiesJson = require('./app/json/cities.json');
var cities = citiesJson.cities;
cities = cities.concat(citiesJson.places, citiesJson.normandy);

cities.forEach(function(city) {
    var path = '/rooms-near-' + encodeURIComponent(city);
    app.get(path, function(req, res) {
        roomsCtrl.getRoomsNear(req, res, city);
    });

    urls.push({url: path,  changefreq: 'daily', priority: 0.3})
});

// Sitemap

var sitemap = sm.createSitemap ({
    hostname: config.publicUrl,
    cacheTime: 600000,
    urls: urls
});

app.get('/sitemap.xml', function(req, res) {
  sitemap.toXML( function (xml) {
      res.header('Content-Type', 'application/xml');
      res.send( xml );
  });
});

app.listen(config.port);