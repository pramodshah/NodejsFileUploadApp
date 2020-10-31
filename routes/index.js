var express = require('express');
var router = express.Router();
var multer = require('multer');
var File = require("../models/file");
var path = require('path');

router.use(express.static(__dirname+"./public/"));

var Storage= multer.diskStorage({
    destination:"./public/uploads/",
    filename:(req,file,cb)=>{
      cb(null,+Date.now()+file.originalname);
    }
});

var upload = multer({
    storage:Storage
}).single('file');
  

router.get('/',(req,res)=>{
    res.render('index');
});
router.post('/upload',upload,function(req, res) {
    var file=req.file.filename;
    var newFile = new File();
    
    newFile.file = file;
    
    newFile.save(function(err,doc){
        if(err) throw err;
        res.redirect('/');
    });
});

router.get('/viewfiles',(req,res)=>{
    File.find({},function(err,files){
        console.log(files);
        if(err) throw err;
        res.render('viewfiles',{files:files});
    })
})

module.exports = router;