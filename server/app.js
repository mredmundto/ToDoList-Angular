// Setting up server
var express = require('express'); 
var app = express(); 

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var Entry = mongoose.model('Entry', { title: String, link: String });
	
//console.log(__dirname +  '/../client'); 
// _dirname is related to the server side 
// no need to put index.html
app.use(express.static(__dirname + '/../client'));

app.listen('3000', function(){
	console.log('example listening to 3000')
}); 
//https://expressjs.com/en/starter/hello-world.html



// Adding body parser 
//https://github.com/expressjs/body-parser
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
 
//https://docs.angularjs.org/api/ng/service/$http 
app.post('/api', function(req, res){	
	var title = req.body.title; 
	var link = req.body.link; 
	console.log(link)	
	var entry = new Entry({ title: title, link: link});
	entry.save(function (err) {
	  if (err) {
	    console.log(err);
	  } else {
	    console.log('this is saved');
	  }
	});

})

app.get('/api', function(req, res){
	Entry.find({}, function(err, data){
	res.send(data); 
})
})


// add this code to remove DB 
// Entry.remove({}, function(err) { 
//    console.log('collection removed') 
// });

// adding database
// adding a database folder 
// http://mongoosejs.com/

// pasting all the code
// pasting that to the top 
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');
