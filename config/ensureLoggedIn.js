//betterreads/config/ensureLoggedIn.js

const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  console.log('ensureLoggedIn middleware executed');
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      console.log('Invalid token');
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    req.user = decoded;
    console.log('Token verified, user:', req.user);
    next();
  });
};
