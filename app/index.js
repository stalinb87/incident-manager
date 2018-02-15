const express = require('express');
const bodyParser = require('body-parser');

const db = require('../config/db');
const incident = require('./incidents');
const locality = require('./localities');
const errorHandler = require('../libs/error.handler');

const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

db.connect();

incident.init(app);
locality.init(app);

app.use(errorHandler.notFound);
app.use(errorHandler.handleError);

module.exports = app;
