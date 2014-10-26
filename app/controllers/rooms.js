module.exports = {
    get: function(req, res) {
        res.render('rooms/rooms', {
            room: req.params.room
        });
    }
}