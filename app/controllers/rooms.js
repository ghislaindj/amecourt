module.exports = {
    getRooms: function(req, res) {
        res.render('rooms/rooms');
    },

    getRoom: function(req, res) {
        res.render('rooms/room', {
            room: req.params.room
        });
    },
    
    getCottage: function(req, res) {
        res.render('rooms/cottage');
    }
}