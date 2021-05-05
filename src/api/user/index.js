const express = require("express");
const userController = require("../../controllers/userController");
const router = express.Router();
const guard = require("../../helpers/guard")
const {
  validatesSchemaUpdateStatusUser,
   validateschemaCreateUser, validatesschemaLoginUser
  } = require("../../validation/validationContacts");

router
.get("/current",guard,userController.getCurrentUser )
.post("/signup", validateschemaCreateUser,userController.regisration)
.post("/login", validatesschemaLoginUser,userController.login)
.post("/logout", guard, userController.logout)
.patch("/current",guard, validatesSchemaUpdateStatusUser,userController.userUpdateStatus)

module.exports = router;
