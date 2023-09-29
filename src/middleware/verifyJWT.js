const jwt = require("jsonwebtoken");


function authenticateJWT(req, res, next) {
  const authHeader = req.headers.Authorization || req.headers.authorization;
 if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
  
  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden (invalid token)
    }

    req.user = user.email;
    req.roles = user.roles;

    next();
  });
}


module.exports = authenticateJWT