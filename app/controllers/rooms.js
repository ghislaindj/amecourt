var validator = require('validator'),
    mongoose = require('mongoose'),
    Room = mongoose.model('Room');

module.exports = {
    getRooms: function(req, res) {
        Room.find({}).exec(function (err, rooms) {
            res.render('rooms/rooms', {rooms: rooms});
        });
    },

    getRoom: function(req, res) {
        var customId = validator.toString(validator.stripLow(req.params.room));

        Room.where({customId: customId}).findOne(function (err, room) {
            if(err) {
                console.log("Error", err);
            }
            if(room) {
                res.render('rooms/room', {
                    roomInfos: room
                });
            } else {
                res.redirect('/');
            }
        });
    },

    getRoomsNear: function(req, res, place) {
        Room.find({}).exec(function (err, rooms) {
            res.render('rooms/nearby', {rooms: rooms, place: place});
        });
    },

};