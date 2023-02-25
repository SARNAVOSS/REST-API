const Certificate = require('../models/certificate.model');
const Question = require('../models/question.model');

exports.createCertificateService = async (certificateBody) => {
 const certificate = await Certificate.create(certificateBody);
 return certificate;
}

exports.getCertificatesService = async (params) => {
 const certificates = await Certificate.find(params);
 return certificates;
}

exports.getCertificateDetailsService = async (params) => {
 const data = await Certificate.findOne(params);
 return data;
}

exports.publishCertificateService = async (params) => {
  //check if certificate has enough questions

  //get number of questions needed
  var num_questions_needed = await Certificate.findOne(params);
  num_questions_needed = num_questions_needed.num_questions;

  //get number of questions
  var num_questions = await Question.find(params);
  num_questions = num_questions.length;

  if (num_questions_needed > num_questions) {
    return false;
  }

  const data = await Certificate.findOneAndUpdate({params}, {isPublic: true});
  return data;
}

exports.unlistCertificateService = async (params) => {
  const data = await Certificate.findOneAndUpdate({params}, {isPublic: false});
}

exports.getTopNCertificatesService = async (params) => {

  // mongodb aggregation to find top n certificates with largest of number
  // of test takers and filtered by user categories the user is interested in

  const {n, user} = params;
  const data = await Certificate.aggregate([
    {
      $match: {
        isPublic: true,
        category: {$in: user.categories}
      }
    },
    {
      $project: {
        _id: 1,
        name: 1,
        num_questions: 1,
        num_test_takers: {$size: '$tests'},
        category: 1,
        company: 1,
      }
    },
    {
      $sort: {
        num_test_takers: -1
      }
    },
    {
      $limit: parseInt(n)
    }
  ]); 
  return data;
}


// others

exports.getNumberofQuestionsNeededService = async (params) => {
 const data = await Certificate.findOne(params);
 return data.num_questions;
}

exports.getNumberofQuestionsService = async (params) => {
  const data = await Question.find(params);
  return data.length;
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