var fs = require('fs');
var formidable = require('formidable');
var mv = require('mv');

exports.upload = function(request, response) {
	console.log("Rozpoczynam obsługę żądania upload.");
	var form = new formidable.IncomingForm();
	form.uploadDir = "./uploaded_files";
	form.multiples = true;
	form.keepExtensions = true;
	form.parse(request, function(error, fields, files) {
		/*console.log(files.upload.path);*/
		/*mv(files.upload.path, '.\/test.jpg', function(err)
				{if(err) throw err;
				console.log('Files moved succesfully');
				});*/
		var fileName = files.upload;
		var fileName = fileName.name
		/*var fileName = fileName.name;*/
		console.log(fileName);
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
	fs.readFile("test.jpg", "binary", function(error, file) {
		response.writeHead(200, {"Content-Type": "image/jpg"});
		response.write(file, "binary");
		response.end();
	});
}