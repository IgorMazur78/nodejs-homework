const express = require("express");
const userController = require("../../controllers/userController");
require("dotenv").config();
const router = express.Router();
const guard = require("../../helpers/guard");
const uploadAvatar = require("../../helpers/uploadAvatar")
const {
  validatesSchemaUpdateStatusUser,
   validateschemaCreateUser, validatesschemaLoginUser
  } = require("../../validation/validationContacts");
  

router
.get("/current",guard,userController.getCurrentUser )
.get("/verify/:token", userController.verifyToken)
.post("/verify", userController.verifyTokenEmail )
.post("/signup",validateschemaCreateUser,userController.regisration)
.post("/login", validatesschemaLoginUser,userController.login)
.post("/logout", guard, userController.logout)
.patch("/current",guard, validatesSchemaUpdateStatusUser,userController.userUpdateStatus)
.patch("/avatar",guard, uploadAvatar.single("avatar"), userController.updateAvatar)

module.exports = router;
