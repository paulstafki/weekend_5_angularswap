var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/weekend_5');

app.use(bodyParser.json());
app.use('/', index);

app.set("port", (process.env.PORT || 3000));

app.listen(app.get("port"), function(){
    console.log("Server listening on port:" + app.get("port"));
});

module.exports = app;