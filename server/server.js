var express = require('express');

var app = express();

require('./config/middleware')(app);

app.listen(process.env.PORT || 8000, function () {
  console.log('listening on ', process.env.PORT || 8000);
});  
