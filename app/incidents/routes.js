const IncidentsController = require('./incidents.controller');
const paginate = require('../../libs/pagination');

module.exports = function routes(app) {
  const controller = IncidentsController(app);

  app.get('/incidents', paginate.middleware, controller.list);
  app.post('/incidents', controller.create);
  app.post('/incidents/:incidentId/archive', controller.archive);
};
