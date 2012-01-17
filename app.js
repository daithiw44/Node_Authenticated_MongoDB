/**
 * Module dependencies.
 */

var express = require('express')
, http = require('http')
, DBManager = require('./lib/DBManager').DBManager
, helpers = require('./lib/helpers')
, config = require('./config');

// set up database and methods.
var dbManager = new DBManager();

//Server
var app = module.exports = express.createServer();

// Configuration
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
  app.use(express.errorHandler());
});

// Routes
app.get('/', function(req, res) {
  res.render('index', {
    title: 'Express'
  });
});

//Here we pass a value in the query string and store that value in the database.
app.get('/input/:somevalue', function(req, res) {
//The parameter passed here is stored in the db
var someValue = req.params.somevalue;
    // Here we customise the parameters we pass to the insert
    // method we are the value we are saving
    // and the option object which we set as
    // safe = true.
    dbManager.objInsert('Values', {thevalue: someValue},{safe: true},function(error, handle) {
        if (error) {
            someValue = 'error';
        }
        res.render('index', {
           title: someValue
        });
    });
});

//We make a post call to get all the values from the
//collection entered via the /input/:someValue page
app.post('/getValues', function(req, res) {
    //Here we customize our call to the objGetAll method.
    //In this example we are passing two empty objects but we could
    //pass {limit:10} as the option.
    dbManager.objGetAll('Values', {},{},function(error, handle) {
    if (error) {
        helpers.writeRes(res, 'application/json', 'false');
    }
    else {
        if (typeof handle !== 'undefined') {
            helpers.writeRes(res, 'application/json', JSON.stringify(handle));
        }
        else {
            helpers.writeRes(res, 'application/json', 'false');
        }
    }
    });
});

app.listen(3000);
console.log('Express server listening on port %d', app.address().port);
