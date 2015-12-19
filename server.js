var express = require('express');

var app = express();

require('./config/middleware')(app, express); 

app.listen(process.env.PORT || 8000, function () {
  console.log('listening on 8000');
});