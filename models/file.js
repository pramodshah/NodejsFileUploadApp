var mongoose = require("mongoose");

var FileSchema = new mongoose.Schema({
    file:{
        type:String,
        required:true
    }

});

var File = mongoose.model('File',FileSchema);
module.exports = File;

