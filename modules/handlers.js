var fs = require('fs');
var formidable = require('formidable');
var mv = require('mv');
var http = require('http');
var urlFile;
var readDir;

exports.upload = function(request, response) {
	console.log("Rozpoczynam obsługę żądania upload.");
	var form = new formidable.IncomingForm();
	form.uploadDir = "./uploaded_files"; 
	form.keepExtensions = true;
	form.parse(request, function(error, fields, files){
		
		urlFile = "uploaded_files/" + files.upload.name;
		urlFile = urlFile.toString();
		
		mv(files.upload.path, urlFile, function(err){
			if(err) throw error;
		console.log('Files moved succesfully');
		});
	});
	
	fs.readdir('./uploaded_files', function(err, files){
		if(err) throw err;
		readDir = files;
	});
		fs.readFile('templates/upload.html',function(error, html){
				response.writeHead(200, {'Content-Type': "text/html; charset=utf-8"});
				response.write(html);
				/*response.write("<img src='/show' />");*/
				
				for(var i=0; i<readDir.length; i++){
					var counter = readDir[i];
					counter=counter.toString();
					fs.readFile('./uploaded_files/' + counter, "binary", function(error, file){
						response.writeHead(200, {"Content-Type": "image/jpg"});
						response.write(file,'binary');
						
					});
				}	
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
	fs.readFile(urlFile, "binary", function(error, file) {
		response.writeHead(200, {"Content-Type": "image/jpg"});
		response.write(file, "binary");
		response.end();
	});
}

exports.css = function(request, response){
	fs.readFile('css/style.css', function(error, file){
		response.writeHead(200, {"Content-Type": "text/css"});
		response.write(file, 'binary');
        response.end();
	});
}

exports.backgroundImage = function(request, response){
	fs.readFile('templates/server.jpg', function(error, file){
		response.writeHead(200, {"Content-Type": "image/jpg"});
		response.write(file, "binary");
		response.end();
	});
}