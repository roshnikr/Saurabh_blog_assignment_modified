var express = require('express');
var app = express();
var url="mongodb://roshni:roshni@ds047901.mlab.com:47901/travel_db";
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var reset="";
app.use(express.static('public'));
app.use(express.static('node_modules'));
// var data_json = require('./data.json');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
var $ = require('jQuery');
// console.log(data_json);
var jsdom = require("jsdom");
var window = jsdom.jsdom().parentWindow;


app.get('/', function (req, res) {
  res.sendFile(__dirname+'/index.html');
});
app.get('/login', function (req, res) {
  res.sendFile(__dirname+'/login.html');
});
app.get('/signup', function (req, res) {
  res.sendFile(__dirname+'/signup.html');
});
app.get('/forgot_password', function(req, res) {
	res.sendFile(__dirname+'/forgot_password.html');
});
// code for forget password
app.post('/reset_password',function(req,res){
	MongoClient.connect(url, function(err, db){
  		var collection = db.collection('login');
  		console.log("connected");
  		collection.find({uname: req.body.user}).toArray(function(err, docs) {
  			if(docs.length>0){
  				res.sendFile(__dirname+'/reset_password.html');
  				reset=__dirname+'/reset_password'+'/'+req.body.user;
  				// req.body.url=reset;
  				jsdom.jQueryify(window, "http://code.jquery.com/jquery-2.1.3.min.js", function () {
  				// var $ = window.$;
  				$("body").append("<h1>The title</h1>");
  				console.log($("h1").html());
 });
  			}
  			else{
  				res.sendFile(__dirname+'/forgot_password.html');
  			}
  		})
  	});
})

app.post('/login',function(req,res){
	MongoClient.connect(url, function(err, db){
  		var collection = db.collection('login');
  		console.log("connected");
  		var i=reset.lastIndexOf('/');
  		reset=reset.substring(i+1);
  // 		collection.update(
  //  			{ uname: reset },
  //  				{
  //     				password=req.body.newpswd
  //  				}
		// );
		collection.update({uname:reset}, {$set: {password:req.body.newpswd}});
    	  res.sendFile(__dirname+'/login.html');
  		
  	});
})
// code for signup
app.get('/login',function(req,res){
	var username=req.param('uname');
	var pass=req.param('password');
	var name1=req.param('name');
	console.log(req.param('uname'));
	MongoClient.connect(url, function(err, db) {
  	var collection = db.collection('login')
  	console.log("connected");
  	collection.find({uname: username}).toArray(function(err, docs) {
    if(docs.length>0){
    	console.log("username already exists");
    	res.sendFile(__dirname+'/signup.html');

    }
    else{
    	 collection.insert({name:name1,uname: username, password:pass}, function(err, result) {
    	 console.log("data added");	
    	 });
    	  res.sendFile(__dirname+'/home.html');
    }
    db.close();
     });
});
});
// code for login
app.post('/home', function(req, res) {
    var user_name = req.body.uname;
    var password = req.body.pass;
    MongoClient.connect(url, function(err, db){
  		var collection = db.collection('login');
  		console.log("connected");
    	collection.find({uname: user_name}).toArray(function(err, docs) {
    		if(docs.length>0){
    				if(password==docs[0].password){
    					res.sendFile(__dirname+'/home.html');
    					console.log("logged in");
    				}
    				else{
    					res.sendFile(__dirname+'/login.html');
    				}
    		}  	
    		else{
    			res.sendFile(__dirname+'/login.html');
    		}		
    	});
   	});
    	
});
app.get('/home', function(req, res) {
	res.sendFile(__dirname+'/home.html');
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});