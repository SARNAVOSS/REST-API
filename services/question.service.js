const Question = require('../models/question.model');

exports.findQuestionInCertificateService = async ({certificate: _id, number: size}) => {
 
 // mongodb aggregation pipeline to find n random questions from a category

  const question = await Question.aggregate([
    { $match: { certificate: _id } },
    { $sample: { size: size } }
  ]);
  return question;
};

exports.createQuestionService = async (questionBody) => {
 const question = await Question.create(questionBody);
 return question;
}