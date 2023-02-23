const express = require("express");
const {  
 getQuestionPaper
} = require("../../controllers/question.controller");

const router = express.Router();

router.get("/getQuestionPaper", getQuestionPaper);

module.exports = router;