const express = require("express");
const router = express.Router();
const authenticateJWT = require('../middleware/verifyJWT');
const verifyRoles = require('../middleware/verifyRoles')
const ROLES_LIST = require('../config/role_lists')

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

router.route("/").get(getAllEmployees).post(authenticateJWT,verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),createNeWEmployee )
router.post('/login', logIn);
router.get('/logout', logOut);
router.post('/refresh', getRefreshToken);
router.route("/:id").put(authenticateJWT,verifyRoles(ROLES_LIST.Admin),updateEmployee).delete(authenticateJWT,verifyRoles(ROLES_LIST.Admin),deleteEmployee).get(getEmployee);

module.exports = router;
