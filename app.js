var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');


var app = express();


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: false
}));


// Database connection method 1 on mongoDB Atlas

const {MongoURI} = require('./config/keys')
mongoose.connect(MongoURI,{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(!err){
        console.log("MongoDB Connected...");
    }else{
        console.log(err);
    }
});




// Database connection method 4 on local computer

// var uri = 'mongodb://localhost:27017/nodejsfileupload';
// var db = mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
//     if(!err){
//         console.log("Successfully connected to MongoDB.");
//     }else{
//         console.log(err);
//     }
// });


// view engine
app.set("view engine","ejs");


// static file
app.use(express.static('public'));

 
// routes
app.use('/',require('./routes/index'));


// server port
const PORT = process.env.PORT || 3000;
app.listen(PORT,function(req,res){
    console.log("Server running on port: 3000");
});