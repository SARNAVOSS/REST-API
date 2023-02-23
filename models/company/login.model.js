const mongoose = require('mongoose')
const bcrypt = require("bcrypt");
const companySchema = new mongoose.Schema({
    name : {
        type : String,  
        required : true,           
    },
    email : {   
        type : String,
        required : true,        
        unique : true,
    },
    company : {
        type : String,
        required : true,        
        unique : true,
    },
    password : {
        type : String,
        required : true,        
    },
    image_url:{
        type : String, 
        default: "https://res.cloudinary.com/dcew0uqhb/image/upload/v1675523956/Arcade/appleLogo_ffdya1.png"       
    } ,
    dob: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    doe: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    business_id: {
        type: String,
        required: true,
    },
    registration_certificate: {
        type: String,
        default: "https://res.cloudinary.com/dcew0uqhb/image/upload/v1645707283/yes_is4kks.png"
    }, 
}, {timestamps : true})


companySchema.methods = {
    authenticate: async function (pass) {
      return await bcrypt.compare(pass, this.password);
    },
  };
module.exports = mongoose.model('Company', companySchema)