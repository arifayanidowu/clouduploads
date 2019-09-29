const express = require("express");
const router = express.Router();
const userController = require("../controller/user");

router.get("/users", userController.index);
router.post("/create", userController.create);

module.exports = router;
