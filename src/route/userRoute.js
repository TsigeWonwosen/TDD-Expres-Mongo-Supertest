const express = require("express");
const router = express.Router();

const { getAllUsers, createNewUser, updateUser, getUserByName, deleteUser } = require("../controllers/usersControllers");

router.get("^/$|/users", getAllUsers);

router.post("/users/", createNewUser);

router.put("/users/:name", updateUser);

router.get("/users/:name", getUserByName);

router.delete("/users/:id", deleteUser);

module.exports = router;
