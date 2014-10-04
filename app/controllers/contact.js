var mongoose = require('mongoose')
    Contact = mongoose.model('Contact');

module.exports = {
    get: function(req, res) {
        res.render('contact');
    },

    create: function(req, res) {
        var contact = new Contact(req.body);

        contact.save(function(err, contact){
            // if(req.accepts('js')) {
            //     if(err) {
            //         return res.json(500, {
            //             message: 'Error',
            //             error: err
            //         });
            //     }
            //     return res.json({
            //         message: 'Contact has been saved',
            //         contact: contact
            //     });
            // } else {
                if(err) {
                    return res.send('500: Internal Server Error', 500);
                }
                return res.render('contact', {contact: contact});
            //}
        });
    }
}