const moment = require('moment');
const Incident = require('./incidents.model');
const errorTypes = require('../../libs/error.handler/error.types');

function IncidentController() {
  return {
    async list(req, res, next) {
      try {
        const { skip, limit, sort } = req.query;
        const toDate = moment()
          .subtract(30, 'days')
          .toDate();
        const incidents = await Incident.find({
          isArchive: false,
          happendAt: { $gte: toDate },
        })
          .skip(skip)
          .limit(limit)
          .sort(sort)
          .exec();
        res.json(incidents);
      } catch (error) {
        next(error);
      }
    },
    async create(req, res, next) {
      try {
        const { kind, location } = req.body;
        const incident = await Incident.create({ kind, location });
        res.json(incident);
      } catch (error) {
        next(error);
      }
    },
    async archive(req, res, next) {
      try {
        const { incidentId } = req.params;
        const updateStatus = await Incident.update({ _id: incidentId }, { isArchive: true });
        if (updateStatus.nModified === 0) {
          throw new Error(errorTypes.INCIDENT_NOT_EXIST_OR_ALREADY_ARCHIVE);
        }
        res.status(204).end();
      } catch (error) {
        next(error);
      }
    },
  };
}

module.exports = IncidentController;
