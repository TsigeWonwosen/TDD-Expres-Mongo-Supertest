const mongoose = require("mongoose");

const { User } = require("./model/userModel");

const db = mongoose
  .connect("mongodb://localhost:27017/employeesDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

async function removeDuplicate() {
  let users = await User.deleteOne({ name: "Rahel" });
  let rahel = await User.find();
  console.log(rahel);
}

// removeDuplicate();

module.exports = db;
