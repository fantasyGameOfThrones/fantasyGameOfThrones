var express = require('express');
var db = require('../dbInterface');

var app = express();

require('./middleware')(app);

db.init().then(function() {
  app.listen(process.env.DB_PORT || 2391, function () {
    console.log('listening on ', process.env.DB_PORT || 2391);
  });  
});
  