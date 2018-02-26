var fs = require('fs');
var formidable = require('formidable');
var mv = require('mv');
var http = require('http');

exports.upload = function(request, response) {
	console.log("Rozpoczynam obsługę żądania upload.");
	var form = new formidable.IncomingForm();
	form.uploadDir = "./uploaded_files"; 
	form.keepExtensions = true;
	form.parse(request, function(error, fields, files){
		console.log(files);
		
		var urlFile = "uploaded_files/" + files.upload.name;
		var urlFile = urlFile.toString();
		
		fs.writeFile('path.txt', './uploaded_files/' + files.upload.name, 'utf-8', function(err){
			if(err) throw err;
			else{
				console.log('File written');
			}
		});
		
		mv(files.upload.path, urlFile, function(err)
		{if(err) throw error;
		console.log('Files moved succesfully');
		});
	fs.readFile('templates/upload.html',function(err, html){
			response.writeHead('200', {'Content-Type': "text/html; charset=utf-8"});
			response.write(html);
			response.write("received image:<br/>");
			response.write("<img src='/show' />");
			response.end();
		});
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
	var path = fs.readFileSync('path.txt', 'utf-8', function(err){
		if(err) throw err;
	});
	console.log(path);
	path = path.toString();
	
	fs.readFile(path, "binary", function(error, file) {
		response.writeHead(200, {"Content-Type": "image/jpg"});
		response.write(file, "binary");
		response.end();
	});
}	