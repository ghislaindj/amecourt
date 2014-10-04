var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ContactSchema = new Schema({
  title: String,
  email: String,
  text: String
});

mongoose.model('Contact', ContactSchema);