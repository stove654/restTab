/**
 * Express configuration
 */

'use strict';


var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');
module.exports = function(app) {

  app.use(cors());
  app.use(compression());
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(bodyParser.urlencoded({ extended: true,
    limit: '50mb',
    parameterLimit: 10000}));
  app.use(bodyParser.json({limit: '50mb',
    parameterLimit: 10000}));

  app.use(function(req, res, next) {
    res.contentType('application/json');
    next();
  });


};
