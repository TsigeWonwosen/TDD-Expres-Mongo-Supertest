const express = require("express");
const router = express.Router();
const authenticateJWT = require('../middleware/verifyJWT')

const {
  getAllEmployees,
  getEmployee,
  createNeWEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeControllers");

const logIn = require('../controllers/authController')
const logOut = require('../controllers/logOutController')
const getRefreshToken = require('../controllers/refreshTokenController')

router.route("/").get(getAllEmployees).post(createNeWEmployee )
router.post('/login', logIn);
router.get('/logout', logOut);
router.post('/refresh', getRefreshToken);
router.route("/:id").put(authenticateJWT,updateEmployee).delete(authenticateJWT,deleteEmployee).get(getEmployee);

module.exports = router;
