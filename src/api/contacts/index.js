const express = require("express");
const router = express.Router();
const controllerContacts = require("../../controllers/controllerContacts");
const { validateSchemaCreateContact, validateSchemaUpdateContact } = require("../../validation/validationContacts")


router
.get("/", controllerContacts.getAll )
.get("/:id",controllerContacts.getById)
.post("/",validateSchemaCreateContact,controllerContacts.create)
.put("/:id",validateSchemaUpdateContact,controllerContacts.update)
.delete("/:id", controllerContacts.remove)
module.exports = router;