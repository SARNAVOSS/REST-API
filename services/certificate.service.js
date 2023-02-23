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

