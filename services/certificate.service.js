const Certificate = require('../models/certificate.model');

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

exports.getNumberofQuestionsService = async ({certificate: certificate}) => {
 const data = await Certificate.findOne({certificate: certificate});
 return data.num_questions;
}

exports.findCertificateService = async (certificateBody) => {

 const certificate_details = await Certificate.find(certificateBody);
 if (certificate_details.length > 0) {
   return true;
 } else { 
   return false;
 }
}

exports.getCertificateIdService = async ({certificate: certificate}) => {
  const certificate_data = await Certificate.findOne({name: certificate});
  return certificate_data._id;
}