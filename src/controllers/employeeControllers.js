const { Employee } = require("../model/Employee");
const bcrypt = require('bcrypt')

 const getAllEmployees = async (req, res) => {
  const employees = await Employee.find();

  if (!employees) return res.status(400).json({ message: "No employee Found." });
  res.status(200).json(employees);
};

const createNeWEmployee = async (req, res) => {
  console.log(req.body)
  if (!req?.body?.name || !req?.body?.email || !req?.body?.password || !req?.body.birthDay) {
    return res.status(400).json({ message: `Name , email, password are required.` });
  }
  try {
    
    const hashedPassword = await bcrypt.hash(req.body.password,10);
  
    const { name, email, birthDate} = req.body;
  
    const foundUser = await Employee.findOne({ email: email })
    
    if (foundUser) return res.status(409).json({ message: `Employee ${ name } already Registered.` })
    
    const newEmployee = new Employee({
      name,
      email,
      birthDate,
      password: hashedPassword,
    });
    await newEmployee.save();
    return res.status(201).json({ message: " Employee successfully  created.", newEmployee });
  } catch (error) {
    console.error(error)
  }
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
    getEmployee
}