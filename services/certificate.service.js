const Certificate = require('../models/question.model');

exports.createCertificateService = async (certificateBody) => {
 const certificate = await Certificate.create(certificateBody);
 return certificate;
}

exports.getCertificatesService = async ({company: company}) => {
 const certificates = await Certificate.find({company: company});
 return certificates;
}

exports.getCertificateDetailsService = async ({_id: _id}) => {
 const data = await Certificate.findOne({_id: _id});
 return data;
}

// others

exports.getNumberofQuestionsService = async ({certificate: _id}) => {
 const number = await Certificate.countDocuments({certificate: _id});
 return number;
}

exports.findCertificateService = async (certificateBody) => {

 const certificate_details = await Certificate.find(certificateBody);
 if (certificate_details.length > 0) {
   return true;
 } else { 
   return false;
 }
}