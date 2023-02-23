const Question = require('../models/question.model');

exports.findQuestionInCertificateService = async ({certificate: _id, number: size}) => {
 
 // mongodb aggregation pipeline to find n random questions from a category

 // check if size is less than the number of questions in the category
  // if it is, return the number of questions specified by size
  // if it is not, return all the questions in the category

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