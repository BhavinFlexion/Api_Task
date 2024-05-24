const mongoose =require("mongoose");

const singlepath = "/upload/singleimage";

const multimage = "/upload/multimage";

const multer = require('multer')

const path = require('path');

const adminSchema = mongoose.Schema({
    // _id:{
    //     type : String,
    //     require: true,
    // },   
    name : {
        type : String,
        require: true
    },
    email : {
        type : String,
        require: true
    },
    password : {
        type : Number,
        require: true
    },
    image : {
        type : String,
        require: true
    },
    multimage: {
        type: Array,
        required: true
    },
    role:{
        type : String,
        require: true
    }
   
})

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        if (file.fieldname == 'image') {
            cd(null, path.join(__dirname, '..', singlepath))
        }else {
            cd(null, path.join(__dirname, "..", multimage))
        }
    },
    filename: (req, file, cd) => {
        cd(null, file.fieldname + "-" + Date.now())
    }
});

adminSchema.statics.uploadAvatar = multer({ storage: storage }).fields([{ name: "image", maxCount: 1 },{ name: "multimage", maxCount: 5 }]);
adminSchema.statics.singlepath = singlepath;
adminSchema.statics.multimage = multimage;

const admin = mongoose.model('admin', adminSchema);

module.exports = admin;