const IncidentsController = require('./incidents.controller');

module.exports = function routes(app) {
  const controller = IncidentsController(app);

  app.get('/incidents', controller.list);
  app.post('/incidents', controller.create);
  app.post('/incidents/:incidentId/archive', controller.archive);
};
