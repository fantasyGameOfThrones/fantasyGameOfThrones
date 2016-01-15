var express = require('express');
var db = require('../db/dbInterface');

var app = express();

//not sure what we should have here
// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', "Origin, X-Access-Token, X-Requested-With, Content-Type, Accept");
//   next();
// });

require('./config/middleware')(app);

db.init().then(function() {
  app.listen(process.env.DB_PORT || 2391, function () {
    console.log('listening on ', process.env.DB_PORT || 2391);
  });  
});
  