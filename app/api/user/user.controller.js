/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /users             ->  index
 * POST    /users              ->  create
 * GET     /users/:id          ->  show
 * PUT     /users/:id          ->  update
 * DELETE  /users/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var path = require("path");
var nedb = require('nedb');
var databaseUrl = "./db/users.db";
var db = {
  users: new nedb({ filename: databaseUrl, autoload: true })
};

exports.index = function(req, res) {
  db.users.find({}, function(err, result) {
    res.json(200, result);
  });
};

// Creates a new user in the DB.
exports.create = function(req, res) {
  db.users.insert(req.body, function (err, user) {
    if(err) { return handleError(res, err); }
    return res.json(201, user);
  });
};


/*
// Get list of Food
exports.index = function(req, res) {
  Food.find(function (err, foods) {
    if(err) { return handleError(res, err); }
    return res.json(200, foods);
  });
};

// Get a single Food
exports.show = function(req, res) {
  Food.findById(req.params.id, function (err, food) {
    if(err) { return handleError(res, err); }
    if(!food) { return res.send(404); }
    return res.json(food);
  });
};

// Creates a new Food in the DB.
exports.create = function(req, res) {
  Food.create(req.body, function(err, food) {
    if(err) { return handleError(res, err); }
    return res.json(201, food);
  });
};

// Updates an existing Food in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Food.findById(req.params.id, function (err, food) {
    if (err) { return handleError(res, err); }
    if(!food) { return res.send(404); }
    var updated = _.merge(food, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, food);
    });
  });
};

// Deletes a Food from the DB.
exports.destroy = function(req, res) {
  Food.findById(req.params.id, function (err, food) {
    if(err) { return handleError(res, err); }
    if(!food) { return res.send(404); }
    food.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
*/
