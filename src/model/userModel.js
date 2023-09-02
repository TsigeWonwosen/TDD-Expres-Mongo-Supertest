const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  age: String,
  address: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};