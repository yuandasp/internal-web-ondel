const EmployeeModel = require("../models/Employees");

const isSuperAdmin = async (req, res, next) => {
  const idUser = req.user.id;

  const user = await EmployeeModel.findOne({ _id: idUser });

  if (user.role === "Superadmin") {
    next();
  } else {
    return res.status(400).send({ message: "Access denied!" });
  }
};

const isHeadOfDepartmentOrHigher = async (req, res, next) => {
  const idUser = req.user.id;

  const user = await EmployeeModel.findOne({ _id: idUser });

  if (user.role === "Superadmin" || user.role === "Head Of Department") {
    next();
  } else {
    return res.status(400).send({ message: "Access denied!" });
  }
};

module.exports = {
  isSuperAdmin,
  isHeadOfDepartmentOrHigher,
};
