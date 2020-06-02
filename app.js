var http = require('http');
var path = require('path');
var express = require('express');

var mongoose = require('mongoose');
var app = express();

mongoose.connect('mongodb://localhost:27017/chatapp',
  function(err){
    if(err){
      console.error(err);
    }else{
      console.log("Successfully connected to MongoDB.");
    }
});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get("/",function(req, res, next) {
	return res.render('index', {title: 'Hello World'});
});

app.get("/hoge",function(req, res, next) {
	return res.send('hoge');
});

var server = http.createServer(app);
server.listen('3000');
