var express = require('express');
var app = express();
var url="mongodb://roshni:roshni@ds047901.mlab.com:47901/travel_db";
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
// var reset="";
app.use(express.static('public'));
app.use(express.static('node_modules'));
// var data_json = require('./data.json');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

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
var reset_user="";

app.post('/reset_password',function(req,res){
	MongoClient.connect(url, function(err, db){
  		var collection = db.collection('login');
  		console.log("connected");
  		collection.find({uname: req.body.user}).toArray(function(err, docs) {
        reset_user=req.body.user;
  			if(docs.length>0){
          var pwd = "<a href='http://localhost:3000/reset_password'>Reset Password</a>" ;
       res.send(pwd);
       console.log(reset_user); 
  				//res.sendFile(__dirname+'/reset_password.html');
  				//reset=__dirname+'/reset_password'+'/'+req.body.user;
  				// req.body.url=reset;
  			}
  			// else{
     //      console.log("user not found");
  			// 	res.sendFile(__dirname+'/forgot_password.html');
  			// }
  		});
  	});
});
app.get("/reset_password",function(req,res){
    console.log(reset_user);
    //var uc=db.collection('userdata');
    res.sendFile(__dirname+"/reset_password.html");
    
   }) ;
app.post('/login',function(req,res){
	MongoClient.connect(url, function(err, db){
  		var collection = db.collection('login');
  		console.log("connected");
  		// var i=reset.lastIndexOf('/');
  		// reset=reset.substring(i+1);
  // 		collection.update(
  //  			{ uname: reset },
  //  				{
  //     				password=req.body.newpswd
  //  				}
		// );
		collection.update({uname:reset_user}, {$set: {password:req.body.newpswd}});
    	  res.sendFile(__dirname+'/login.html');
  		
  	});
});
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
      var title=req.body.title;
      var author=req.body.author;
      var content=req.body.content;
      var date=req.body.date;
      var id;
      var collection2=db.collection('post_data');
      collection2.find().toArray(function(err, docs) {
        id=docs.length+1;
      });
      console.log(id);
      
      collection2.insert({id:id,title:title,content:content,editdate:date, author:author}, function(err, result) {
       console.log("data added to db"); 
       });
      
   	});
    	
});
// app.get('/home', function(req, res) {
	

// });
app.get('/addpost', function(req, res) {
  res.sendFile(__dirname+'/addpost.html');
});
// app.post('/test',function(req,res){
//   console.log("inside test");
//   var fs = require('fs');
//   var fileName = 'data.json';
//   var file = require(fileName);// this is not how you read files.. require() is used for including
  
//   fs.writeFile(fileName, req.body.datas, function (err) {
//   if (err) return console.log(err);
//   console.log(req.body.datas);
//   console.log('writing to ' + fileName);
// });l
//   res.sendFile(__dirname+'/home.html');
// })
app.get("/adddata",function(req,res){
   MongoClient.connect(url, function(err, db){
      var collection = db.collection('post_data');
      console.log("connected");
      collection.find().toArray(function(err, docs) {
        var json_data=docs;
        console.log(json_data);
        res.send(json_data);
      });
    });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});