const Question = require('../models/question.model');
const { getNumberofQuestionsService } = require('./certificate.service');

exports.getQuestionPaperService = async ({certificate: certificate}) => {
 
 // mongodb aggregation pipeline to find n random questions from a category

  const size = await getNumberofQuestionsService({certificate: certificate});

  const question = await Question.aggregate([
    { $match: { name: certificate } },
    { $sample: { size: size } }
  ]);
  return question;
};

exports.createQuestionService = async (questionBody) => {
 const question = await Question.create(questionBody);
 return question;
}