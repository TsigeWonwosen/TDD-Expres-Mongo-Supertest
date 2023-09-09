const express = require("express");
const router = express.Router();

const { getAllEmployees, createNeWEmployee, updateEmployee, deleteEmployee } = require("../controllers/employeeControllers");

router.route.get("/", getAllEmployees).post("/", createNeWEmployee);

router.route.put("/users/:id", updateEmployee).delete("/users/:id", deleteEmployee);

module.exports = router;
