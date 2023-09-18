const { User } = require("../model/userModel");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) return res.status(204).json({ message: "No users found." });

    return res.status(200).json(users);
  } catch (error) {
    console.log("Database Error : " + error);
  }
};

const createNewUser = async (req, res) => {
  const { name, age, email, address } = req.body;
  if (!name || !age || !email || !address) {
    return res.status(400).json({ message: "Name , age, email and address are required." });
  }

  const user = new User({
    name,
    age,
    email,
    address,
  });

  try {
    let checkUser = await User.findOne({ name: user.name });
    if (checkUser) {
      return res.status(409).json({ data: "User is already Registered ." });
    }

    const newUser = await user.save();
    return res.status(201).json(newUser);
  } catch (e) {
    console.log("Database Post Error : " + e);
    return res.status(500).json({ data: "Server Error." });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id.toString();
    // const user = await User.findById({ _id: id });
    const user = await User.findById(id);

    if (!user) return res.status(204).json({ message: `No user matches ${req.params.id} name.` });

    if (req.body?.email) user.email = req.body.email;
    if (req.body?.name) user.name = req.body.name;
    if (req.body?.address) user.address = req.body.address;
    if (req.body?.age) user.age = req.body.age;

     // Explicitly set _id
    user._id = id;
    
    await user.save();
    return res.status(200).json({ data: user });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const getUser = async (req,res) => {
  try {
    if (!req.params.id) return res.status(400).json({ message: "user Id required." });
    const id = req.params.id.toString();
    const obj = await User.findOne({ _id: id });
    if (!obj) return res.status(400).json({ message: "User is not found. " });
    return res.status(200).json({ data: obj });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


const getUserByName = async (req, res) => {
  try {
    if (!req.params.name) return res.status(400).json({ message: "user name required." });
    const username = req.params.name;
    const obj = await User.findOne({ name: username });
    if (!obj) return res.status(400).json({ message: "User is not found. " });
    return res.status(200).json({ data: obj });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ message: `User Id required.` });
    }
    const user = await User.findOne({ _id: userId }).exec();
    console.log(" 2*** " + user);

    if (!user) {
      return res.status(400).json({ data: "User is not found." });
    }
    const result = await user.deleteOne({ _id: userId });
    return res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  getUserByName,
  getUser,
  deleteUser,
};
