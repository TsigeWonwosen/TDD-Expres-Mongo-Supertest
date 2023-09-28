const { Employee } = require("../model/Employee");
const jwt = require('jsonwebtoken')


const handleRefreshToken = async (req, res) => {
  try {
    const cookies = req.cookies; // Access cookies directly
    if (!cookies || !cookies.jwt) {
      return res.sendStatus(401);
    }
    
    const refreshToken = cookies.jwt;
    
    const foundEmployee = await Employee.findOne({ refreshToken }).exec();
    
    if (!foundEmployee) {
      return res.status(403).json({message:"Employee not found matched with refresh Token${refreshToken}"}); // Forbidden
    }

    // Evaluate jwt
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {

        if (err || foundEmployee.email!== decoded.email) {
          return res.sendStatus(403);
        }

        const roles = Object.values(foundEmployee.roles);
        const accessToken = jwt.sign(
          {
            name: foundEmployee.name,
            email: foundEmployee.email,
            roles : roles
            },
          
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '20s' }
        );

        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.error(error);
    res.sendStatus(500); // Internal Server Error
  }
};


module.exports = handleRefreshToken