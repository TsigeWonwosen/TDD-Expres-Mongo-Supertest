const { Employee } = require("../model/Employee");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const handleLogIn = async (req, res) => {

  if (!req.body.email || !req.body.password) return res.status(400).json({ 'message': 'Employee email and password required.' });
try {
  const foundEmp = await Employee.findOne({ email: req.body.email })
  if (!foundEmp) return res.status(401).json({ message: "Unauthorized User" }
  )
  const result = await bcrypt.compare(req.body.password, foundEmp.password)
  
  if(!result) return res.status(400).json({message:`Password is not correct.`})

  const roles = Object.values(foundEmp.roles).filter(Boolean);
  const userInfo = {
    email: foundEmp.email,
    roles:roles
  }
  const accessToken = await jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' }); 
  
  const refreshToken = await jwt.sign(userInfo, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })
  
  res.user = accessToken;
  res.roles = roles;
  res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 ,secure: true, sameSite: 'None'}) //secure: true, sameSite: 'None'
  
  foundEmp.refreshToken = refreshToken;
  await foundEmp.save()

  res.json({roles,accessToken,})
} catch (error) {
  console.error(error)
}
 };

 module.exports = handleLogIn