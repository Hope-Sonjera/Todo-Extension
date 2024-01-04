// server/middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Error verifying token', error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
