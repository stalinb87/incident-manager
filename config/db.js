const mongoose = require('mongoose');
const { DB } = require('./app');

const uri = DB;

module.exports = {
  connect: function connect() {
    mongoose.connect(uri);
  },
};
