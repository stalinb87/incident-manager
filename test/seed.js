const db = require('../config/db');

db.connect();

const Locality = require('../app/localities/localities.model');
const Incident = require('../app/incidents/incidents.model');
const incidentTypes = require('../app/incidents/incident.types');

const localityList = [
  { name: 'Ciudad Colonial' },
  { name: 'Ensanche La Fé' },
  { name: 'Mejoramiento Social' },
  { name: 'San Carlos' },
  { name: 'Villas Agrícolas' },
  { name: 'Invivienda' },
  { name: 'Villa Carmen' },
];
const seed = () =>
  Locality.insertMany(localityList).then((localities) => {
    const incidents = [];
    localities.forEach((locality) => {
      incidents.push({
        location: locality,
        kind: incidentTypes.MURDER,
      });
    });
    return Incident.insertMany(incidents);
  });
module.exports = seed;
