var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var BookSchema = new Schema({
  title: String,
  email: String,
  text: String
});

mongoose.model('Article', BookSchema);