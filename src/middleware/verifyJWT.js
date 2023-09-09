const jwt = require("jsonwebtoken");
const secretKey = "njnjbbhjjuebtmhuooet";
const secretKey2 = "njnjbkhhhhjhgbhjjuebtmhuooet";
require("dotenv").config();

function authenticateJWT(req, res, next) {
  const token = req.header.Authorization || req.header.authorization;

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden (invalid token)
    }

    req.user = user;
    next();
  });
}

const user = { id: 1, username: "wonde shi" };
const user2 = { id: 2, username: "abel" };
const token1 = jwt.sign(user, secretKey, { expiresIn: "1h" });
const token2 = jwt.sign(user2, secretKey, { expiresIn: "1h" });
// console.log("token : " + token1);
console.log("token2 : " + JSON.stringify(process.env.ACCESS_TOKEN_SECRET));

jwt.verify(token2, secretKey, (err, user) => {
  try {
    if (!user) throw new Error("wrong secret Key.");
    console.log("verified Token : " + JSON.stringify(user));
  } catch (err) {
    console.log(`${err.name} : ${err.message}`);
  }
});
