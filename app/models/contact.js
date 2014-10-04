var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ContactSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  guestCount : Number,
  arrivalDate: Date,
  departureDate: Date,
  content: String
});

mongoose.model('Contact', ContactSchema);