var validator = require('validator'),
    roomJson = require('../json/rooms.json');

module.exports = {
    getRooms: function(req, res) {
        res.render('rooms/rooms', {rooms: roomJson.rooms});
    },

    getRoom: function(req, res) {
        var id = validator.toString(validator.stripLow(req.params.room));

        var render = function(roomInfos){
            res.render('rooms/room', {
                roomInfos: roomInfos
            });
        };

        if (id == '1'){
            render(roomJson.rooms[0]);
        } else if (id == '2') {
            render(roomJson.rooms[1]);
        } else if (id == '3') {
            render(roomJson.rooms[2]);
        } else if (id == '4') {
            render(roomJson.rooms[3]);
        } else {
            res.redirect('/');
        }
    }
};