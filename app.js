var express = require("express");

var app = express();

var fs = require('fs');

var bodyParser= require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing       application/x-www-form-urlencoded



/****************** read folders from file ************************/
app.get('/api/visit-counter', (req, res) => {
	//var path = process.cwd();
	//console.log('1111111 ', path);
	let counter  =  0;
	fs.readFile('public/counters.txt', 'utf8', function (err,data) {
	  	if (err) {
	    	return console.log('Error reading data from file: ', err);
	  	}

  		console.log('data', data);
  		res.send(data);
	});
});

app.post('/api/update-counter', function (req, res) {
  fs.writeFile("public/counters.txt", req.body.count, function(err) {
    if(err) {
       return console.log("Error writing to file", err);
    }
    console.log('Count write: ', req.body.count);
    res.status(200).send(req.body.count);
  }); 
});



var server = app.listen(server.address().port, () => {

		var host = server.address().address;
		var port = server.address().port;

		console.log('Demo app listening at http://%s:%s', host, port);	
});



