const routes = require('./routes');

module.exports = {
  init: function init(app) {
    return routes(app);
  },
};
