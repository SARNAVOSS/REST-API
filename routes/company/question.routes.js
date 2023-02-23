const express = require("express");
const {
 createQuestion
} = require("../../controllers/question.controller");

const router = express.Router();

router.post("/createQuestion", createQuestion);

module.exports = router;