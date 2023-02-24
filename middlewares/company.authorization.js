const jwt = require('jsonwebtoken');
const {findCompanyService} =  require('../services/company.service');

exports.companyAuthorization =  async (req, res, next) => {

 if (!req.headers.authorization) {
  return res.status(401).json({ message: 'No Authorization Header. Unauthorized!' });
 }

 try{
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.accessTokenSecret);
  const company = await findCompanyService({_id: decoded.id});
  if (!company) {
   return res.status(401).json({ message: 'Unauthorized' });
  }
  req.company = company;
  next();
 }
 catch (error) {
  return res.status(401).json({ message: 'Unauthorized' });
 }
};