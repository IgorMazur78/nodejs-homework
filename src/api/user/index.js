const express = require("express");
const userController = require("../../controllers/userController");
const router = express.Router();
const guard = require("../../helpers/guard")
const {
   validateschemaCreateUser, validatesschemaLoginUser
  } = require("../../validation/validationContacts");

router
.get("/current", )
.post("/signup", validateschemaCreateUser,userController.regisration)
.post("/login", validatesschemaLoginUser,userController.login)
.post("/logout", guard, userController.logout)

module.exports = router;
