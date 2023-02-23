import jwt from 'jsonwebtoken';
import companyService from '../services/company.service';

export default async (req, res, next) => {

 if (req.headers.authorization === undefined) {
  return res.status(401).json({ message: 'Unauthorized' });
 }

 try{
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const company = await companyService.getCompanyById(decoded.id);
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