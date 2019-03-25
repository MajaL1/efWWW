var express = require("express");

var app = express();

var fs = require('fs');

var path = require('path');

var bodyParser= require('body-parser');

require('dotenv').config();

console.log(`11111 `, process.env.API_URL); // 8626

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing       application/x-www-form-urlencoded

var server = app.listen(() => {

		var host = "localhost";
		var port =  5000;

		console.log('Web app listening at http://%s:%s', host, port);	
});

app.on('uncaughtException', function (err) {
    console.log( "UNCAUGHT EXCEPTION " );
    console.log( "[Inside 'uncaughtException' event] " + err.stack || err.message );
});

app.use(function(err, req, res, next){
  console.log('ERROR::: '.err.stack);
  // additional logic, like emailing OPS staff w/ stack trace
});

app.use(express.static(__dirname + '/public', {
        maxAge: 86400000,
        setHeaders: function(res, path) {
            res.setHeader("Expires", new Date(Date.now() + 2592000000*30).toUTCString());
          }
    }))
app.get('/*', function (req, res) {
   // res.writeHead(200, {
  //'Content-Encoding': 'gzip' });
    
    if (req.url.indexOf("/images/") === 0 || req.url.indexOf("/stylesheets/") === 0) {
    res.setHeader("Cache-Control", "public, max-age=2592000");
    res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
        
  }
   res.status(200,{
  'Content-Encoding': 'gzip' }).sendFile(path.join(__dirname+'/public/index.html'));
});





