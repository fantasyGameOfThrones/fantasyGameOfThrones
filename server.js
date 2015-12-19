var express = require('express');
var bodyParse = require('body-parser');

var app = express();

require('./config/middleware')(app, express); 

app.listen(8000, function () {
  console.log('listening on 8000');
});