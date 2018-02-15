const mongoose = require('mongoose');

const { Schema } = mongoose;
const incidentType = require('./incident.types');

const Incident = new Schema({
  kind: {
    type: String,
    enum: Object.values(incidentType),
    required: true,
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Localities',
    required: true,
  },
  happendAt: {
    type: Date,
    default: new Date(),
  },
  isArchive: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model('Incident', Incident);
