const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const EmployeeModel = require("../models/Employees");

module.exports = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await EmployeeModel.findOne({ username: username });
      if (user === null) {
        return res
          .status(400)
          .send({ message: "Username or password is invalid" });
      }

      const isPasswordValid = bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res
          .status(400)
          .send({ message: "Username or password is invalid" });
      }

      let payload = {
        id: user._id,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

      return res.status(200).send({
        message: "Login success!",
        token,
        data: {
          userId: user._id,
          username: user.username,
          role: user.role,
          employeeName: user.employeeName,
          position: user.position,
          status: user.status,
        },
      });
    } catch (error) {
      console.log(`Error: login ${error}`);
      return res.status(500).send({ message: `Error: ${error}` });
    }
  },
  changePassword: async (req, res) => {
    try {
      const iduser = req.user.id;
      const { password, newPassword } = req.body;

      const user = await EmployeeModel.findOne({ _id: iduser });

      if (user === null) {
        return res.status(400).send({ message: "User not found" });
      }

      if (password) {
        const isPasswordValid = bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return res
            .status(400)
            .send({ message: "Current password is invalid" });
        }
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(newPassword, salt);

      await EmployeeModel.findOneAndUpdate(
        { _id: user.id },
        { $set: { password: hashPassword } }
      );

      return res.status(200).send({
        message: "Success change password!",
      });
    } catch (error) {
      console.log(`Error: changePassword ${error}`);
      return res.status(500).send({ message: `Error: ${error}` });
    }
  },
};
