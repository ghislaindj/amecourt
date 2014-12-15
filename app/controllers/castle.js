module.exports = {
    getHistory: function(req, res) {
        res.render('castle/history');
    },

    getSite: function(req, res) {
        res.render('castle/site');
    },

    getActivities: function(req, res) {
        res.render('castle/activities');
    },

    getBikes: function(req, res) {
        res.render('castle/bikes');
    },
}