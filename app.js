"use strict";

var http = require('http');
var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');

var Message = require('./schema/Message');

var app = express();

mongoose.connect('mongodb://localhost:27017/chatapp',
  function(err){
    if(err){
      console.error(err);
    }else{
      console.log("Successfully connected to MongoDB.");
    }
});

app.use(bodyparser());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get("/",function(req, res, next) {
	return res.render('index', {title: 'Hello World'});
});

app.get("/update",function(req, res, next) {
	return res.render('update');
});

app.get("/hoge",function(req, res, next) {
	return res.send('hoge');
});

app.post("/update", function(req, res, next) {
  var newMessage = new Message({
    username: req.body.username,
    message: req.body.message
    //username: "foo",
    //message: "bar"
  });
  newMessage.save((err)=>{
    if(err) throw err;
    return res.redirect("/");
  });
});

var server = http.createServer(app);
server.listen('3000');
