/** 
	server.js
	@author: Vivek Dalal
	@description: Music Website in Nodejs, Express, HTML and CSS
	
**/

// importing modules
var express = require('express');
var fs = require('fs');

// initialize an express app
var app = express();

// declare public directory to be used as a store for static files
app.use('/public', express.static(__dirname + '/public'));


// Setting the default route to our home page
app.get('/',function(req,res){
	
	return res.redirect('/public/home.html');

});


//This endpoint feeds the music file in the browser which is played there and then
app.get('/music', function(req,res){
	
	var fileId = req.query.id; 
	var file = __dirname + '/music/' + fileId;
	console.log('Play music endpoint called for ', fileId);
	fs.exists(file,function(exists){
		if(exists)
		{
            var rstream = fs.createReadStream(file);
            //res.setHeader('Content-Type', 'application/audio/mpeg3');
            rstream.pipe(res);
            
		}
		else
		{
			console.log('Error! File not found. Filename: ', fileId);
			res.send("Its a 404");
			res.end();
		}
	
	});
});

//This endpoints provides download functionality
app.get('/download', function(req,res){
	var fileId = req.query.id;
	var file = __dirname + '/music/' + fileId;
	console.log('Download endpoint called for ', fileId);
	fs.exists(file,function(exists){
		if(exists)
		{
			res.setHeader('Content-disposition', 'attachment; filename=' + fileId);
			res.setHeader('Content-Type', 'application/audio/mpeg3')
			var rstream = fs.createReadStream(file);
			rstream.pipe(res);
		}
		else
		{
			console.log('Error! File not found. Filename: ', fileId);
			res.send("Its a 404");
			res.end();
		}
	});
});

app.get('/lyrics', function(req,res){
	var fileId = req.query.id;
	console.log('Lyrics endpoint called for ', fileId);
	return res.redirect('/public/' + fileId+ '.html');
});

app.get('/videos', function(req,res){
	var fileId = req.query.id;
	console.log('Video endpoint called for ', fileId);
	return res.redirect('/public/videos/' + fileId+ '_vid.html');
});

// start app on port 3000 and log the message to console

app.listen(3000,function(){
	console.log('App listening on port 3000!');
});