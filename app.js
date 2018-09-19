// node app server maja is testing app

var express = require("express");

var app = express();

var fs = require('fs');

var bodyParser= require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing       application/x-www-form-urlencoded



/****************** read number of views ************************/
app.get('/api/visit-counter', (req, res) => {
	let counter  =  0;
	fs.readFile('public/counters.txt', 'utf8', function (err,data) {
	  	if (err) {
	    	return console.log('Error reading data from file: ', err);
	  	}

  		console.log('data', data);
  		res.send(data);
	});
});


/****************** write number of views ********************/
app.post('/api/update-counter', function (req, res) {
  fs.writeFile("public/counters.txt", req.body.count, function(err) {
    if(err) {
       return console.log("Error writing to file", err);
    }
    console.log('Count write: ', req.body.count);
    res.send(JSON.stringify(req.body.count));
  }); 
});

/************** read number of downloads  ***********************/
app.get('/api/get-audio-data/:fileName', (req, res) => {
	//var path = process.cwd();
	let counter  =  0;
	fs.readFile('public/'+req.params.fileName, 'utf8', function (err,data) {
	  	if (err) {
	    	return console.log('Error reading data from file: ', err);
	  	}
  		res.send(data);
	});
});


/************* write number of downloads  **************/
app.post('/api/update-download-counter', function (req, res) {
	var fileToWrite=req.body.fileToWrite;
	var dataToWrite = JSON.stringify(req.body.dataToWrite);

  	fs.writeFile("public/"+fileToWrite, dataToWrite, function(err) {
	    if(err) {
	       	return console.log("Error writing to file", err);
	    }
	    res.status(200).send(req.body.count);
	  }); 
});



var server = app.listen(process.env.PORT || 3000, () => {

		var host = server.address().address;
		var port = server.address().port;

		console.log('......Demo app listening at http://%s:%s', host, port);	
});



