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
const { getQuestionPaperService, createQuestionService } = require("../services/question.service");

// get certificate id from certificate name
const { getCertificateIdService } = require("../services/certificate.service");




// question create controller

exports.createQuestion = async (req, res) => {
  const { certificate, question, option1, option2, option3, option4, answer, difficulty, image } = req.body;

  // checks if any of the required fields are empty
  if (!certificate || !question || !option1 || !option2 || !option3 || !option4 || !answer || !difficulty || !image) {
    return messageError(res, BAD_REQUEST, "All fields are required");
  }

  // get certificate id from certificate name

  const certificate_id = await getCertificateIdService({ certificate: certificate });

  // check if answer in options

  if (answer !== option1 && answer !== option2 && answer !== option3 && answer !== option4) {
    return messageError(res, BAD_REQUEST, "Answer must be one of the options");
  }

  if (!certificate_id) {
    return messageError(res, CONFLICT, "No Such Certificate Exists");
  } else {
    //create new question

    const questionObject = {
      certificate: certificate_id,
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
          id: savedQuestion._id,
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

      return messageCustom(res, CREATED,"Question created successfully", message);
    } catch (error) {
      return messageError(res, SERVER_ERROR, "Internal Server Error");
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

    return messageCustom(res, CREATED, "Question Paper Fetched Successfully" ,message);
  } catch (error) {
    return messageError(res, SERVER_ERROR, "Server error");
  }
};