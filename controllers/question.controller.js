require('dotenv/config');
const { message, messageCustom, messageError } = require('../functions/message');
const {
  OK,
  CREATED,
  BAD_REQUEST,
  CONFLICT,
  SERVER_ERROR,
  UNAUTHORIZED,
} = require('../functions/messageType');
const { getQuestionPaperService, createQuestionService } = require("../../services/company/company.service");


// question create controller

exports.createQuestion = async (req, res) => {
  const { certificate, question, option1, option2, option3, option4, answer, difficulty, image } = req.body;

  // checks if any of the required fields are empty
  if (!certificate || !question || !option1 || !option2 || !option3 || !option4 || !answer || !difficulty || !image) {
    return messageError(res, BAD_REQUEST, "All fields are required");
  }


  if (question_data) {
    return messageError(res, CONFLICT, "Question already exists");
  } else {
    //create new question

    const questionObject = {
      certificate: certificate,
      question: question,
      options: [option1, option2, option3, option4],
      answer: answer,
      difficulty: difficulty,
      image: image,
    };

    try {

      // save question to database
      const savedQuestion = await createQuestionService(questionObject);

      // create custom message to send back with data and token

      const message = {
        error: false,
        message: "Question created successfully",
        data: {
          certificate: savedQuestion.certificate,
          question: savedQuestion.question,
          option1: savedQuestion.option1,
          option2: savedQuestion.option2,
          option3: savedQuestion.option3,
          option4: savedQuestion.option4,
          answer: savedQuestion.answer,
          difficulty: savedQuestion.difficulty,
          image: savedQuestion.image,
        },
      };

      return messageCustom(res, CREATED, message);
    } catch (error) {
      return messageError(res, SERVER_ERROR, "Server error");
    }
  }
};

// get question paper controller

exports.getQuestionPaper = async (req, res) => {
  const { certificate } = req.params;

  // checks if any of the required fields are empty
  if (!certificate) {
    return messageError(res, BAD_REQUEST, "All fields are required");
  }

  try {
    // find question in certificate
    const question_data = await getQuestionPaperService({ certificate: certificate});

    // create custom message to send back with data and token

    const message = {
      error: false,
      message: "Question paper created successfully",
      data: {
        questions: question_data,
      },
    };

    return messageCustom(res, CREATED, message);
  } catch (error) {
    return messageError(res, SERVER_ERROR, "Server error");
  }
};