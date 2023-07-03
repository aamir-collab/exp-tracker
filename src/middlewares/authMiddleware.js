const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith('Bearer')) {
    token = req?.headers?.authorization?.split(' ')[1];
    try {
      if (token) {
        const decodedUser = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findById(decodedUser?.id);
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error('Not authorized');
    }
  } else {
    throw new Error('No token attached in the header');
  }
});

module.exports = authMiddleware;
