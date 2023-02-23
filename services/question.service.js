const Question = require('../models/question.model');
const { getNumberofQuestionsService } = require('./certificate.service');

exports.getQuestionPaperService = async ({certificate: _id}) => {
 
 // mongodb aggregation pipeline to find n random questions from a category

  const size = await getNumberofQuestionsService({certificate: _id});

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