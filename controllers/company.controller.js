const bcrypt = require("bcrypt");
require('dotenv/config');
const {
  createToken,
  cryptoEncrypt,
} = require("../functions/crypto.js");
const { findCompanyService, signUpService } = require("../services/company.service");
const { message, messageCustom, messageError } = require('../functions/message');
const {
  OK,
  CREATED,
  BAD_REQUEST,
  CONFLICT,
  SERVER_ERROR,
  UNAUTHORIZED,
} = require('../functions/messageType');


// company registration controller
exports.companyRegistration = async (req, res) => {

  const { name, email, company, password, dob, phone, location, doe, size, business_id } = req.body;

  // checks if any of the required fields are empty
  if (!name || !email || !company || !password || !phone) {
    return messageError(res, BAD_REQUEST, "All fields are required");
  }

  // checks if company already exists
  const company_data = await findCompanyService({ email: email });

  if (company_data) {
    return messageError(res, CONFLICT, "Company already exists");
  } else {
    //create new company

    // hash password
    const hash_password = await bcrypt.hash(password, 10);

    const companyObject = {
      name: name,
      email: email,
      company: company,
      password: hash_password,
      phone: phone,
    };

    try {

      // save company to database
      const savedCompany = await signUpService(companyObject);

      // create custom message to send back with data and token

      const message = {
        error: false,
        message: "Company registered successfully",
        data: {
          name: savedCompany.name,
          email: savedCompany.email,
          company: savedCompany.company,
          phone: savedCompany.phone,
        },
        token: createToken({
          id: savedCompany._id,
          name: savedCompany.name,
          email: savedCompany.email,
        }),
      };

      return messageCustom(res, CREATED, "Company Registration Completed Successfully", message);
    } catch (error) {
      return messageError(res, SERVER_ERROR, error);
    }
  }
}

// company login controller
exports.companyLogin = async (req, res) => {

  const { email, phone, password } = req.body;

  // checks if any of the required fields are empty
  if (!email && !phone ) {
    return messageError(res, BAD_REQUEST, "All fields are required");
  }

  // checks if password is null
  if (!password) {
    return messageError(res, BAD_REQUEST, "Password is required");
  }

  // checks if company exists

  if (email) {
    var company_data = await findCompanyService({ email: email });

    if (!company_data) {
      return messageError(res, UNAUTHORIZED, "Company does not exist");
    }

    // checks if password is correct
    const validPassword = await bcrypt.compare(password, company_data.password);

    if (!validPassword) {
      return messageError(res, UNAUTHORIZED, "Invalid password");
    }

    // create custom message to send back with data and token

    const message = {
      error: false,
      message: "Company logged in successfully",
      data: {
        name: company_data.name,
        email: company_data.email,
        company: company_data.company,
        phone: company_data.phone,
      },
      token: createToken({
        id: company_data._id,
        name: company_data.name,
        email: company_data.email,
      }),

    };

    return messageCustom(res, OK, "Company Logged in Successfully", message);
  } else {

    var company_data = await findCompanyService({ phone: phone });

    if (!company_data) {
      return messageError(res, UNAUTHORIZED, "Company does not exist");
    }

    // checks if password is correct
    const validPassword = await bcrypt.compare(password, company_data.password);

    if (!validPassword) {
      return messageError(res, UNAUTHORIZED, "Invalid password");
    }

    // create custom message to send back with data and token

    const message = {
      error: false,
      message: "Company logged in successfully",
      data: {
        name: company_data.name,
        email: company_data.email,
        company: company_data.company,
        phone: company_data.phone,
      },

      token: createToken({
        id: company_data._id,
        name: company_data.name,
        email: company_data.email,
      }),
    };
    return messageCustom(res, OK, "Company Logged in Successfully", message);
  }
};