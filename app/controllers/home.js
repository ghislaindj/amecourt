var mongoose = require('mongoose'),
    Room = mongoose.model('Room');

module.exports = {
    get: function(req, res) {
        Room.find({onHomepage: true}).exec(function (err, rooms) {
            res.render('home', {rooms: rooms});
        });
    }
};