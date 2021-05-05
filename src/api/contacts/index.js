const express = require("express");
const router = express.Router();
const guard = require("../../helpers/guard");
const controllerContacts = require("../../controllers/controllerContacts");
const {
  validateSchemaCreateContact,
  validateSchemaUpdateContact,
  validateSchemaUpdateStatusContact,
} = require("../../validation/validationContacts");

router
  .get("/", controllerContacts.getAll)
  .get("/:id", controllerContacts.getById)
  .post(
    "/",
    guard,
    validateSchemaCreateContact,
    controllerContacts.create
  )
  .put("/:id", guard, 
  validateSchemaUpdateContact, 
  controllerContacts.update)
  .patch(
    "/:id/customer",
    guard,
    validateSchemaUpdateStatusContact,
    controllerContacts.update
  )
  .delete("/:id", guard, controllerContacts.remove);
module.exports = router;
