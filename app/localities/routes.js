const LocalityController = require('./localities.controller');
const paginate = require('../../libs/pagination');

module.exports = function routes(app) {
  const controller = LocalityController(app);

  app.get('/localities', paginate.middleware, controller.list);
  app.get('/localities/:localityId', controller.get);
};
