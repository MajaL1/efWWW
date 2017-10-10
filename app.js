/********************* SYSTEM IMPORTS ***************************/

const express = require("express");
const app = express();
const fs = require('fs');


/********************* CONSTANTS ***********************/
var PATH = 'public/pictures/';



app.use(express.static('public'));
app.use(express.static('pictures'));


/****************** read folders from file ************************/
app.get('/pictures', (req, res) => {

	let folders = [];
	
	fs.readdir(PATH, function(err, items) {

		/**** Todo: check if item is directory ****/
		for (var i=0; i<items.length; i++) {
			if(fs.lstatSync(PATH+'/'+items[i]).isDirectory()) {
				if(!(items[i].startsWith('.'))){
					folders.push(items[i]);
				}
			}
		}
		let foldersJson = JSON.stringify(folders);
		res.json(foldersJson);
	});
});


/*********************** read subfolders for each folder **************************/
/*** gets list of months which contain pictures: 'May', 'June', 'July' ***/
app.get('/pictures/:year', (req, res) => {

	let folders = [];
	let year = req.params.year;
	
	let monthsPath = PATH + year;
	fs.readdir(monthsPath, (err, months) => {

		/**** Todo: check if item is directory ****/
		for (var i=0; i<months.length; i++) {
			let directoryPath = fs.lstatSync(monthsPath+'/'+months[i]); 
			if(directoryPath.isDirectory() && !(months[i].startsWith("."))){
				folders.push(months[i]+" "+year);
			}
		}
		let monthsJson = JSON.stringify(folders);
		res.json(monthsJson);
	});
});
/*********************** end read subfolders for each folder **************************/



/*********************** read pictures from month folder **************************/
/*** gets list of pictures from folder 'May', 'June', 'July' ***/
app.get('/pictures/:year/:month/', (req, res) => {

	let imagesArray = [];
	let year = req.params.year;
	let month = req.params.month;
	let toIndex = req.query.toIndex;
	let fromIndex = req.query.fromIndex;


	console.log(" FROM INDEX, TO INDEX :::::: ", fromIndex, toIndex, year, month);
	let filePath = PATH + year+'/'+month+'/';
	
	fs.readdir(filePath, (err, files) => {

		let imagesPerPage = files.slice(fromIndex, toIndex);

		imagesPerPage.forEach(file => {

			if(file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png') || file.endsWith ('gif')) {
		

				let fileText = fs.readFileSync(filePath+file);

				let base64File = new Buffer(fileText).toString('base64');
				imagesArray.push(base64File);
			}

		});
		res.send(imagesArray);
	});
});
/*********************** end read subfolders for each folder **************************/


/*********************** get total number of pictures per folder **************************/
app.get('/getPictureCount', (req, res) => {

	let year = req.query.year;
	let month = req.query.month;
	let filePath = PATH + year+'/'+month+'/';
	
	let count = 0;

	console.log('path, ', PATH, ': year: ', year, 'month: ',month);

	fs.readdir(filePath, (err, files) => {
		files.forEach(file => {
			if(file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png') || file.endsWith ('gif')) {
			count++;
		}
		});
		res.status(200).json({
			'count': count
		});
	});	
});






/**********************************************************************************/
/*********************** list pictures from a directory **************************/
function getImages(imageDir, callback){
	let fileType = '.jpg';
	let imageArray = [];
	let index;

	fs.readdir(imageDir, (err, imageList) => {
		for(i=0; i<imageList.length; i++) {
			if(path.extname(imageList[i]) === fileType) {
                imageArray.push(imageList[i]); //store the file name into the array files
            }
        }
        callback(err, imageArray);
    });
}

/**********************************************************************************/
/*********************** starting server **************************/

// menda se binda na vse ip-je, ce dodamo 0.0.0.0., se firewall je treba odpret ????
var server = app.listen(process.env.PORT || 3000) => {
	
	var port = server.address().port;
	console.log('...App listening at port %s...', port);	
});



