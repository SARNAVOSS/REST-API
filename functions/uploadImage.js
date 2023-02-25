// this file is a helper file to help upload files to the cloudinary. this will export a 
//function that can be imported wherever necessary

// import the multer package
const { parse } = require('dotenv');
const multer = require('multer');

// import the cloudinary package
const cloudinary = require('cloudinary').v2;

// import the cloudinary storage package
const {CloudinaryStorage} = require('multer-storage-cloudinary');

// configure the cloudinary package
cloudinary.config({
 secure: true
});


// configure the multer package to store to database

const storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});

// configure the multer package to store to cloudinary
const cloudinaryImageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'SkillUp',
    allowedFormats: ['jpeg', 'jpg', 'png']
  }
});

//new configuration for pdfs
const cloudinaryPdfStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'SkillUp',
    allowedFormats: ['pdf']
  }
});

// export the multer package
const imageParser = multer({ storage: cloudinaryImageStorage });
const pdfParser = multer({ storage: cloudinaryPdfStorage });

module.exports = {
  imageParser,
  pdfParser
}