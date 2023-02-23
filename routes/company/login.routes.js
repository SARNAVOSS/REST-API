const express = require("express");
const {
  companyLogin,
  companyRegistration
} = require("../../controllers/company/login.controller");

const router = express.Router();

router.post("/login", companyLogin);
router.post("/register",companyRegistration);

module.exports = router;