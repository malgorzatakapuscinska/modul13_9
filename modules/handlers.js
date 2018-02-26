var fs = require('fs');
var formidable = require('formidable');
var mv = require('mv');
var http = require('http');

/*exports.upload = function(request, response) {
	console.log("Rozpoczynam obsługę żądania upload.");
	var form = new formidable.IncomingForm();
	form.uploadDir = "./uploaded_files"; 
	form.keepExtensions = true;
	form.parse(request, function(error, fields, files){
		
		var urlFile = "uploaded_files/" + files.upload.name;
		var urlFile = urlFile.toString();
		
		mv(files.upload.path, urlFile, function(err)
		{if(err) throw error;
		console.log('Files moved succesfully');
		});
		/*fs.renameSync(files.upload.path, urlFile);*/
	/*	fs.readFile('templates/upload.html',function(err, html){
			response.writeHead('200', {'Content-Type': "text/html; charset=utf-8"});
			response.write(html);
			response.write("received image:<br/>");
			response.write("<img src='/show' />");
			response.end();
		});
	});
	

}*/

exports.uploaded_files = function(request, response){
	//response.setHeader("Access-Control-Allow-Origin", "*");
	//response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	fs.readdir('./uploaded_files', 'utf-8',  function(err, files){
		if(err) throw err;
		console.log(files);
		var filesTable = files;
		console.log('zawartość zmiennej filesTable: ' + filesTable);
		filesTable = filesTable.toString();
		/*console.log('długość tablicy: ' + filesTable.length);
		var xxx = './uploaded_files/' + filesTable[0];
		console.log(xxx);*/
		
		response.write(filesTable, 'utf-8', );
		response.end();
	});
}

exports.welcome = function(request, response) {
	console.log("Rozpoczynam obsługę żądania welcome.");
	fs.readFile('templates/start.html', function(err, html) {
		response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
		response.write(html);
		response.end();
	});

}

exports.error = function(request, response) {
	console.log("Nie wiem co robić.");
	response.write("404");
	response.end();
}

exports.show = function(request, response) {
	fs.readdir('./uploaded_files', 'utf-8',  function(err, files){
		if(err) throw err;
		console.log(files);
		var filesTable = files;
		console.log('zawartość zmiennej filesTable: ' + filesTable);
		console.log('długość tablicy: ' + filesTable.length);
		var xxx = './uploaded_files/' + filesTable[0];
		console.log(xxx);
		for(var i=0;i<filesTable.length;i++){
			fs.readFile(xxx, "binary", function(error, file) {
				response.writeHead(200, {"Content-Type": "image/jpg"});
				response.write(file, "binary");
			});
		}
	});
	
	
}