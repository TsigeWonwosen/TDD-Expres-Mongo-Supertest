const { User } = require("../model/userModel");

const getAllUsers = async (req, res) => {
  try {
    const userFromDatabase = await User.find();
    return res.status(200).json(userFromDatabase);
  } catch (error) {
    console.log("Database Error : " + error);
  }
};

const createNewUser = async (req, res) => {
  const user = new User({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    address: req.body.address,
  });

  try {
    let checkUser = await User.findOne({ name: user.name });
    if (checkUser) {
      return res.status(400).json({ data: "User is already Register ." });
    }
    const newUser = await user.save();

    return res.status(201).json({ data: newUser });
  } catch (e) {
    console.log("Database Post Error : " + error);
    return res.status(500).json({ data: "Server Error." });
  }
};

const updateUser = async (req, res) => {
  try {
    const obj = await User.findOne({ name: req.params.name });

    obj.email = req.body.email;
    await obj.save();
    return res.status(200).json({ data: obj });
  } catch (e) {
    res.status(500).json({ error: e.massage });
  }
};

const getUserByName = async (req, res) => {
  try {
    const obj = await User.findOne({ name: req.params.name });
    return res.status(200).json({ data: obj });
  } catch (error) {
    res.status(500).json({ error: error.massage });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndRemove(req.params.id);
    if (!deletedUser) {
      return res.status(400).json({ data: "User is not in DB." });
    }
    return res.status(200).json({ data: deletedUser });
  } catch (error) {
    res.status(500).json({ error: error.massage });
  }
};
module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  getUserByName,
  deleteUser,
};
