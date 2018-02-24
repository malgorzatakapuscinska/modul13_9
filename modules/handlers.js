var fs = require('fs');
var formidable = require('formidable');
var mv = require('mv');

exports.upload = function(request, response) {
	console.log("Rozpoczynam obsługę żądania upload.");
	console.log(request);
	var form = new formidable.IncomingForm();
	form.uploadDir = "./uploaded_files";
	/*form.multiples = true;*/
	form.keepExtensions = true;
	form.parse(request, function(error, fields, files){
	
		var urlFile = "uploaded_files/" + files.upload.name;
		var urlFile = urlFile.toString();
		mv(files.upload.path, urlFile, function(err)
		{if(err) throw error;
		console.log('Files moved succesfully');
		});
		/*fs.renameSync(files.upload.path, urlFile);*/
		fs.readFile('templates/upload.html',function(err, html){
			response.writeHead('200', {'Content-Type': "text/html; charset=utf-8"});
			response.write(html);
			response.write("received image:<br/>");
			response.write("<img src='/show' />");
			response.end();
		});
		fs.writeFileSync('url_file.txt', urlFile, 'utf-8', function(err){
			if(err){ throw err;
			} else {console.log('url_file.txt written');}
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
	var urlFile = fs.readFileSync('url_file.txt', 'utf-8',  function(err){
		if(err) throw err;
	});
	fs.readFile(urlFile, "binary", function(error, file) {
		response.writeHead(200, {"Content-Type": "image/jpg"});
		response.write(file, "binary");
		response.end();
	});
}