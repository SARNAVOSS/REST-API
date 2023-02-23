const bcrypt = require("bcrypt");
const { message, messageCustom, messageError } = require('../../functions/message');
const { createToken } = require('../../functions/crypto');
const {
  OK,
  CREATED,
  BAD_REQUEST,
  CONFLICT,
  SERVER_ERROR,
  UNAUTHORIZED,
} = require('../../functions/messageType');
const { findUserService, signUpService } = require("../../services/user.service");

require('dotenv/config');

// user registration controller
exports.userRegistration = async (req, res) => {

  const { name, email, user_name, password, dob, phone } = req.body;


  // checks if any of the required fields are empty
  if (!name || !email || !user_name || !password || !phone) {
    messageError(res, BAD_REQUEST, "All fields are required");
  }

  // checks if user already exists
  const user = await findUserService({ email: email });

  if (user) {
    messageError(res, CONFLICT, "User already exists");
  } else {
    //create new user

    // hash password
    const hash_password = await bcrypt.hash(password, 10);

    const user ={
      name: name,
      email: email,
      user_name: user_name,
      password: hash_password,
      phone: phone,
    };

    try {

      // save user to database
      const savedUser = await signUpService(user);

      // create custom message to send back with data and token

      const message = {
        error: false,
        data: {
          name: savedUser.name,
          email: savedUser.email,
          user_name: savedUser.user_name,
          phone: savedUser.phone,
        },
        token: createToken({
          id: savedUser._id,
          name: savedUser.name,
          email: savedUser.email,
        })
      };

      // send back response
      messageCustom(res, CREATED, "User Registration Completed Successfully" ,message);
    } catch (err) {

      // send back error due to server error
      return res.status(SERVER_ERROR.statusCode).json(message(SERVER_ERROR, "Error creating user"));
    }
  }
}

exports.userLogin = async (req, res) => {
  const { email, phone, password } = req.body;

  if (!email && !phone) {
    return messageError(res, BAD_REQUEST, "Email or Phone is required");
  }

  if (!password) {
    return messageError(res, BAD_REQUEST, "Password is required");
  }

  if (email) {
    const user = await findUserService({ email: email });

    if (!user) {
      return messageError(res, UNAUTHORIZED, "No User Exists with provided email");
    }

    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) {
      return messageError(res, UNAUTHORIZED, "Invalid Password");
    }

    const message = {
      error: false,
      message: "User logged in successfully",
      data: {
        name: user.name,
        email: user.email,
        user_name: user.user_name,
        phone: user.phone,
      },
      token: createToken({
        id: user._id,
        name: user.name,
        email: user.email,
      })
    };

    return messageCustom(res, OK, "User logged in successfully", message);
  } else {
    const user = await findUserService({ phone: phone });

    if (!user) {
      return messageError(res, UNAUTHORIZED, "No User Exists with provided phone number");
    }

    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) {
      return messageError(res, UNAUTHORIZED, "Invalid Password");
    }

    const message = {
      error: false,
      message: "User logged in successfully",
      data: {
        name: user.name,
        email: user.email,
        user_name: user.user_name,
        phone: user.phone,
      },
      token: createToken({
        id: user._id,
        name: user.name,
        email: user.email,
      })
    };

    return messageCustom(res, OK, "User logged in successfully", message);
  }
};