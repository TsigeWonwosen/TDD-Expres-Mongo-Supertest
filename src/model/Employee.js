const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  birthDate: String,
  refreshToken: String,
  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Editor: Number,
    Admin: Number,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = {
  Employee,
};
