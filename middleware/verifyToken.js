const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, 'secret123'); // secret key used in login
    req.user = decoded;
    next(); // ✅ Token is valid — continue to route
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
