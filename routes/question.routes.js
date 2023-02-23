const express = require("express");
const {
 createQuestion, getQuestionPaper
} = require("../controllers/question.controller");

const router = express.Router();

router.post("/createQuestion", createQuestion);
router.get("/getQuestionPaper", getQuestionPaper);

module.exports = router;