const express = require("express");
const router = express.Router();
const { employeeController } = require("../contollers/index");
const { verifyToken } = require("../middleware/authVerificationToken");
const {
  isHeadOfDepartmentOrHigher,
  isSuperAdmin,
} = require("../middleware/role");

router.get("/", verifyToken, employeeController.fetchAllEmployee);
router.get("/:id", verifyToken, employeeController.fetchDetailEmployee);
router.patch(
  "/:id",
  verifyToken,
  isHeadOfDepartmentOrHigher,
  employeeController.editEmployee
);
router.patch("/:id", verifyToken, isSuperAdmin, employeeController.assignRole);
router.post(
  "/",
  verifyToken,
  isHeadOfDepartmentOrHigher,
  employeeController.createEmployee
);

module.exports = router;
