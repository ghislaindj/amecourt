var mongoose = require('mongoose'),
  Schema = mongoose.Schema
  timestamps = require('mongoose-timestamp');

var ContactSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  guestCount : Number,
  arrivalDate: Date,
  departureDate: String,
  room: Date,
  content: String
});

ContactSchema.plugin(timestamps);

var contact = mongoose.model('Contact', ContactSchema);

contact.formage = {
    label: 'Demandes de réservation',
    singular: 'Demande de réservation',

    filters: ['artist', 'year'],


    // list of fields to be displayed by formage for this model
    list: ['name', 'email', 'phone', 'arrivalDate', 'departureDate'],

    // list of order fields
    order_by: ['-createdAt', 'createdAt'],

};