const Company = require('../../models/company/login.model');

exports.findCompanyService = async (param) => {
 var company = await Company.findOne(param);
 return company;
};

exports.signUpService = async (companyBody) => {
 const company = await Company.create(companyBody);
 return company;
}