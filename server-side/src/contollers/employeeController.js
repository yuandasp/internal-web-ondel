const EmployeeModel = require("../models/Employees");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  fetchAllEmployee: async (req, res) => {
    try {
      const employeeList = await EmployeeModel.find();

      const removePasswordEmployeeList = employeeList.map((data) => ({
        _id: data._id,
        username: data.username,
        role: data.role,
        employeeName: data.employeeName,
        position: data.position,
        status: data.status,
      }));

      return res.status(200).send({
        message: "Success fetch all data employee",
        data: removePasswordEmployeeList,
      });
    } catch (error) {
      console.log(`Error: fetchAllEmployee ${error}`);
      res.status(500).send({ message: `Error: ${error}` });
    }
  },
  fetchDetailEmployee: async (req, res) => {
    try {
      const userId = req.params.id;

      const employee = await EmployeeModel.findOne({ _id: userId });

      const removePasswordEmployee = {
        _id: employee._id,
        username: employee.username,
        role: employee.role,
        employeeName: employee.employeeName,
        position: employee.position,
        status: employee.status,
      };

      return res.status(200).send({
        message: "Success fetch detail data employee",
        data: removePasswordEmployee,
      });
    } catch (error) {
      console.log(`Error: fetchDetailEmployee ${error}`);
      res.status(500).send({ message: `Error: ${error}` });
    }
  },
  createEmployee: async (req, res) => {
    try {
      const { username, employeeName, position, role, status } = req.body;

      const password = process.env.DEFAULT_PASSWORD;

      const isUsernameExist = await EmployeeModel.findOne({
        username: username,
      });
      if (isUsernameExist) {
        return res.status(400).send({ message: "Username has been used!" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const employeeData = {
        username,
        employeeName,
        position,
        role,
        status,
        password: hashPassword,
      };
      const createEmployee = await EmployeeModel.create(employeeData);

      return res.status(200).send({
        message: "Success create a employee!",
      });
    } catch (error) {
      console.log(`Error: createEmployee ${error}`);
      res.status(500).send({ message: `Error: ${error}` });
    }
  },
  editEmployee: async (req, res) => {
    try {
      const userId = req.params.id;
      const { employeeName, position, status } = req.body;

      if (
        req.body !== "employeeName" ||
        req.body !== "position" ||
        req.body !== "status"
      ) {
        return res.status(400).send({ message: "The request is failed!" });
      }

      const updateFields = {};

      if (employeeName) {
        updateFields.employeeName = employeeName;
      }

      if (position) {
        updateFields.position = position;
      }

      if (status) {
        updateFields.status = status;
      }

      await EmployeeModel.findOneAndUpdate(
        { _id: userId },
        { $set: updateFields },
        { new: true }
      );

      return res.status(200).send({ message: "Success edit data employee" });
    } catch (error) {
      console.log(`Error: editEmployee ${error}`);
      res.status(500).send({ message: `Error: ${error}` });
    }
  },
  assignRole: async (req, res) => {
    try {
      const userId = req.params.id;

      if (req.body !== "role") {
        return res.status(400).send({ message: "The request is failed!" });
      }

      await EmployeeModel.findOneAndUpdate(
        { _id: userId },
        { $set: req.body },
        { new: true }
      );

      return res.status(200).send({ message: "Success assign new role" });
    } catch (error) {
      console.log(`Error: assignRole ${error}`);
      res.status(500).send({ message: `Error: ${error}` });
    }
  },
  changePasswordEmployee: async (req, res) => {
    try {
      const userId = req.params.id;
      const { newPassword } = req.body;

      if (req.body !== "newPassword") {
        return res.status(400).send({ message: "The request is failed!" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(newPassword, salt);

      await EmployeeModel.findOneAndUpdate(
        { _id: userId },
        { $set: { password: hashPassword } },
        { new: true }
      );

      return res.status(200).send({ message: "Success change password" });
    } catch (error) {
      console.log(`Error: changePasswordEmployee ${error}`);
      res.status(500).send({ message: `Error: ${error}` });
    }
  },
};
