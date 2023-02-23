const User = require('../models/user.model');

exports.findUserService = async (param) => {
 var user = await User.findOne(param);
 return user;
};

exports.signUpService = async (userBody) => {
 const user = await User.create(userBody);
 return user;
};