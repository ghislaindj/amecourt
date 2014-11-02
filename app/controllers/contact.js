var mongoose = require('mongoose')
    Contact = mongoose.model('Contact');

module.exports = {
    get: function(req, res) {
        res.render('contact');
    },

    create: function(req, res) {
        var contact = new Contact(req.body);
        console.log("new body", req.body);
        console.log("new contact", contact);
        contact.save(function(err, contact){
            if(req.accepts('js')) {
                if(err) {
                    return res.json(500, {
                        message: 'Il y a eu un problème, retentez !',
                        error: err
                    });
                }
                return res.json({
                    message: 'Booking has been saved',
                    contact: contact
                });
            } else {
                if(err) {
                    return res.send('500: Internal Server Error', 500);
                }
                return res.render('contact', {contact: contact});
            }
        });
    }
}