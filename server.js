var express = require('express');

var app = express();


//for dev testing
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', "Origin, X-Access-Token, X-Requested-With, Content-Type, Accept");
  next();
});

require('./config/middleware')(app, express); 

app.listen(process.env.PORT || 8000, function () {
  console.log('listening on 8000');
});