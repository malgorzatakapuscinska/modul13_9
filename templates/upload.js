var myHeaders = {
	'http.cors.enabled' : true,
	'http.cors.allow-origin' : "*"
}

$.ajaxSetup({
	headers: myHeaders
});

$.ajax({
		url:'http://localhost:9000/uploaded_files',
		method: 'GET',
			success: function(data){
			     console.log(data);
			}
});

