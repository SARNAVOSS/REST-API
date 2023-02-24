const express = require("express");
const {
 createQuestion, getQuestionPaper
} = require("../controllers/question.controller");

const { companyAuthorization } = require("../middlewares/company.authorization");

const router = express.Router();

router.post("/create" ,createQuestion);
router.get("/getQuestionPaper", getQuestionPaper);

module.exports = router;