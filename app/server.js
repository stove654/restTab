var express = require('express');
var app = express();
var morgan = require('morgan');

// set port
var port = process.env.PORT || 8080;

// Connect to database

var server = require('http').createServer(app);

// use morgan to log requests to the console
app.use(morgan('dev'));

require('./config/express')(app);
require('./routes')(app);

app.get('/', function(request, response) {
  response.send('Hello World!');
});
server.listen(port, function () {
  console.log('HotTab server listening on port: ', port);
});




/*
var db = {
  foods: new nedb({ filename: databaseFoodsUrl, autoload: true }),
  categories: new nedb({ filename: databaseCategoriesUrl, autoload: true })
};

var app = express();


// EXPRESS stuffs ================================================
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.urlencoded({ extended: true,
  limit: '50mb',
  parameterLimit: 10000}));
app.use(bodyParser.json({limit: '50mb',
  parameterLimit: 10000}));

app.use('/static', express.static('app/images'));

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', function(req, res) {
  res.json({ message: '#HotTab printing server started...' });
});

//List foods
router.route('/foods')
  // List of printers in the LAN
  .get(function(req, res) {
    db.foods.find({}, function(err, result) {
      res.send(result);
    });
  })

  .post(function(req, res) {
    db.foods.insert(req.body, function (err, newFoods) {
      res.send(newFoods);
    });
  });

router.route('/foods/:id')
  .get(function(req, res) {
    db.foods.find({ food_category_id : req.params.id }, function (err, result) {
      res.send(result);
    })
  });

//List categories
router.route('/categories')
  .get(function(req, res) {
    db.categories.find({}, function(err, result) {
      res.send(result);
    });
  })

  .post(function(req, res) {
    db.categories.insert(req.body, function (err, categories) {
      res.send(categories);
    });
  });



app.use('/api', router);
app.listen(port);
console.log('#HotTab printing server running with port ' + port);

*/
