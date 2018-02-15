const mongoose = require('mongoose');

const { Schema } = mongoose;

const Locality = new Schema({
  name: String,
});
module.exports = mongoose.model('Locality', Locality);
