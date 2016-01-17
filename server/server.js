var express = require('express');
require('dotenv').load();

var app = express();

require('./config/middleware')(app);

app.listen(process.env.PORT, function () {
  console.log('listening on ', process.env.PORT);
  console.log('in phase: ', process.env.NODE_ENV);
});  
