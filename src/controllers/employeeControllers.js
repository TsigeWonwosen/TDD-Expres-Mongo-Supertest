const { Employee } = require("../model/Employee");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');

 const getAllEmployees = async (req, res) => {
  const employees = await Employee.find();

  if (!employees) return res.status(400).json({ message: "No employee Found." });
  res.status(200).json(employees);
};

const createNeWEmployee = async (req, res) => {
  if (!req?.body?.name || !req?.body?.email || !req?.body?.password || !req?.body?.roles) {
    return res.status(400).json({ message: `Name , email, password are required.` });
  }
  const hashedPassword = await bcrypt.hash(req.body.password,10);

  const { name, email, roles } = req.body;

  const foundUser = await Employee.findOne({ email: email })
  
  if (foundUser) return res.status(403).json({ message: `Employee ${ name } already Registered.` })
  
  const newEmployee = new Employee({
    name,
    email,
    roles,
    password: hashedPassword,
  });
  await newEmployee.save();
  return res.status(201).json({ message: " Employee successfully  created.", newEmployee });
};

const updateEmployee = async (req, res) => {
   try {
     const { name, email, roles } = req.body;
     //const Id = req.params.id;
    
     const employee = await Employee.findById(req.params.id).exec();
   console.log("Employee :" + employee)
   
     if (!employee) return res.status(400).json({ message: "Employee Not found." });
   
     employee.name = name;
     employee.email = email;
     employee.roles = roles;
   
     const result = await employee.save();
     return res.status(200).json({ message: "Update successfully.", result });
    
   } catch (error) {
    console.error(error.message)
   }
};

const deleteEmployee = async (req, res) => {
     if (!req?.params?.id) return res.status(400).json({ 'message': 'Employee ID required.' });

    const employee = await Employee.findOne({ _id: req.params.id }).exec();
    if (!employee) {
        return res.status(204).json({ "message": `No employee matches ID ${req.body.id}.` });
    }
    const result = await employee.deleteOne(); //{ _id: req.body.id }
    res.json(result);
 };

const logIn = async (req, res) => {
    if (!req.body.email || !req.body.password) return res.status(400).json({ 'message': 'Employee email and password required.' });
try {
  const foundEmp = await Employee.findOne({email:req.body.email})
  const result = await bcrypt.compare(req.body.password, foundEmp.password)
  
  if(!result) return res.status(400).json({message:`Password is not correct.`})

  const accessToken = await jwt.sign({email:foundEmp.email,name:foundEmp.name}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' }); 
  
  const refreshToken = await jwt.sign({email:foundEmp.email,name:foundEmp.name}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })
  
  res.user = accessToken;
  res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }) //secure: true, sameSite: 'None'
  
  foundEmp.refreshToken = refreshToken;
  await foundEmp.save()

  res.json({accessToken:accessToken,foundEmp})
} catch (error) {
  console.error(error)
}
 };

const logOut = async (req, res) => {
   
   const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const foundEmployee = await Employee.findOne({ refreshToken }).exec();
    if (!foundEmployee) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    // Delete refreshToken in db
    foundEmployee.refreshToken = '';
    const result = await foundEmployee.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.stuatus(204).json({message});
 };

const getRefreshToken = async (req, res) => {
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
            email: foundEmployee.email
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


const getEmployee = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Employee ID required.' });

    const employee = await Employee.findOne({ _id: req.params.id }).exec();
    if (!employee) {
        return res.status(204).json({ "message": `No employee matches ID ${req.params.id}.` });
    }
    res.json(employee);
}


module.exports = {
    getAllEmployees,
    createNeWEmployee,
    updateEmployee,
    deleteEmployee,
    logIn,
    logOut,
    getRefreshToken,
    getEmployee
}