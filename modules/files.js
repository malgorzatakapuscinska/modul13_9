var fs = require('fs');

fs.readdir('./uploaded_files', 'utf-8', function(err, files){
	if(err) throw error;
	console.log(files);
});