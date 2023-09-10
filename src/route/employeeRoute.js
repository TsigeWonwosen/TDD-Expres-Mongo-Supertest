const express = require("express");
const router = express.Router();
const authenticateJWT = require('../middleware/verifyJWT')

const {
  getAllEmployees,
  getEmployee,
  createNeWEmployee,
  updateEmployee,
  deleteEmployee,
  logIn,
  logOut,
  getRefreshToken,
  
} = require("../controllers/employeeControllers");

router.route("/").get(getAllEmployees).post(authenticateJWT,createNeWEmployee )
router.get('/login', logIn);
router.get('/logout', logOut);
router.post('/refresh', getRefreshToken);
router.route("/:id").put(authenticateJWT,updateEmployee).delete(authenticateJWT,deleteEmployee).get(getEmployee);

module.exports = router;
