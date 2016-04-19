'use strict';

var config = require('../../config/config'),
    nodemailer = require('nodemailer'),
    path = require('path'),
    templatesDir   = path.resolve(__dirname, '..', 'mailer/templates'),
    emailTemplates = require('email-templates'),
    initializer = require('../../helpers/initializer');

var EmailAddressRequiredError = new Error('email address required');

var transporter = nodemailer.createTransport({
    service: 'Mailjet',
    auth: {
        user: config.mailer.auth.user,
        pass: config.mailer.auth.pass
    }
});

var sendBookingNotification = function(contact, fn) {
    console.log("sendBookingNotification", contact);
    var locals = {
        toEmail: config.mailer.defaultToAddress,
        fromEmail: contact.email.length > 0  ? contact.email : config.mailer.defaultFromAddress,
        subject: 'Une nouvelle demande de réservation',
        contact: contact
    };

    sendOne('booking', locals, fn);
};

var sendOne = function (templateName, locals, fn) {
    emailTemplates(templatesDir, initializer, function (err, template) {
        if (err) {
            console.log(err);
            return fn(err);
        }
        template(templateName, locals, function (err, html, text) {
            if (err) {
                console.log(err);
                return fn(err);
            }
            console.log(html);

            transporter.sendMail({
                from: locals.fromEmail,
                to: locals.toEmail,
                subject: locals.subject,
                html: html,
                // generateTextFromHTML: true,
                text: text
            }, function (err, responseStatus) {
                if (err) {
                    console.log(err);
                    return fn(err);
                }
                console.log(responseStatus);
                return fn(null, responseStatus.message, html, text);
            });
        });
    });
};

exports.sendBookingNotification = sendBookingNotification;
exports.sendOne                 = sendOne;
