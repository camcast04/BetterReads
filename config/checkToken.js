// better-reads/config/checkToken.js

const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.get('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
    }
    req.user = decoded.user;
    next();
  });
};


// const jwt = require('jsonwebtoken');

// module.exports = function(req, res, next) {
//   // Check for the token being sent in a header or as a query param
//   let token = req.get('Authorization') || req.query.token;
//   // Default to null
//   req.user = null;
//   if (!token) return next();
//   // Remove the 'Bearer ' that was included in the token header
//   token = token.replace('Bearer ', '');
//   // Check if token is valid and not expired
//   jwt.verify(token, process.env.SECRET, function(err, decoded) {
//     // Invalid token if err
//     if (err) return next();
//     // decoded is the entire token payload
//     req.user = decoded.user;
//     // If interested in the expiration,
//     // and we just happen to be...
//     req.exp = new Date(decoded.exp * 1000);
//     return next();
//   });
// };

