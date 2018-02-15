const Localities = require('./localities.model');
const errorTypes = require('../../libs/error.handler/error.types');

module.exports = function LocalitiesController() {
  return {
    async list(req, res, next) {
      const { skip, limit, sort } = req.query;
      try {
        const localities = await Localities.find()
          .skip(skip)
          .limit(limit)
          .sort(sort)
          .exec();
        res.json(localities);
      } catch (error) {
        next(error);
      }
    },
    async get(req, res, next) {
      try {
        const { localityId } = req.params;
        const locality = await Localities.findOne({ _id: localityId }).exec();
        if (locality) {
          res.json(locality);
        } else {
          throw new Error(errorTypes.LOCALITY_NOT_FOUND);
        }
      } catch (error) {
        next(error);
      }
    },
  };
};
