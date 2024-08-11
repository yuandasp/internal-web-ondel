const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  username: String,
  password: String,
  employeeName: String,
  position: String,
  role: String,
  status: String,
});

const EmployeeModel = mongoose.model("employees", EmployeeSchema);
module.exports = EmployeeModel;
