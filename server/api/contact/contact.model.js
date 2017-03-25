var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var contact = new Schema({
  name: String,
  email: String,
  feedback: String,
  time: Date,
  resolved: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Contact', contact);
