var express = require('express');
require('dotenv').load();
var db = require('../dbInterface');

var app = express();

require('./middleware')(app);

db.init().then(function() {
  app.listen(process.env.DB_PORT, function () {
    console.log('listening on ', process.env.DB_PORT);
    console.log('in phase: ', process.env.NODE_ENV);
  });  
});
  