var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

var data = null;
fs.readFile('./testData.json','utf8',function(err, text){
  data = err ? console.log(err) : text;
});

//for dev testing
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', "Origin, X-Access-Token, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../dist'));

app.route('/api/characters')
  .get(function(req, res){
    res.send(data);
  })
  .post(function(req, res){
    res.status(500).send('something broke!');
  })
  .put(function(req, res){
    res.send();
  });


// require('./config/middleware')(app, express); 

app.listen(8000, function () {
  console.log('listening on 8000');
});