const jwt = require('jsonwebtoken');
const {findUserService} =  require('../services/user.service');

export default async (req, res, next) => {

 if (req.headers.authorization === undefined) {
  return res.status(401).json({ message: 'Unauthorized' });
 }


 try {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await findUserService({_id: decoded.id});
  if (!user) {
   return res.status(401).json({ message: 'Unauthorized' });
  }
  req.user = user;
  next();
 } catch (error) {
  return res.status(401).json({ message: 'Unauthorized' });
 }
};