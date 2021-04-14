// const { v4: uuid } = require("uuid");
// const db = require("../db/db");
// const { ObjectID } = require("mongodb");
const contact = require("../schema/schemaContact");

class RepositoryContacts {
  constructor() {
    // this.collection = client.db().collection("contacts");
    this.modelContact = contact;
  }

  async getAllContacts() {
    const result = await this.modelContact.find({});
    return result;
  }

  async getById(id) {
    const result = await this.modelContact.findOne({ _id: id });
    return result;
  }

  async createContact(body) {
     const newContact = await this.modelContact.create(body);
    return newContact;
  }

  async updateContact(id, body) {
    const result  = await this.modelContact.findByIdAndUpdate(
      { _id: id },
      { ...body },
      { new: true }
    );
    return result;
  }

  async removeContact(id) {
       const result  = await this.modelContact.findByIdAndRemove({
      _id: id,
    });
    return result;
  }
}
// ---------------------------------------------

// class RepositoryContacts {
//   constructor() {}

//   getAllContacts() {
//     return db.get("contacts").value();
//   }

//   getById(id) {
//     const result = db.get("contacts").find({ id }).value();
//     return result;
//   }

//   createContact(body) {
//     const id = uuid();
//     const newContact = {
//       id,
//       ...body,
//     };
//     db.get("contacts").push(newContact).write();
//     return newContact;
//   }

//   updateContact(id, body) {
//     const updateContacts = db.get("contacts").find({ id }).assign(body).value();
//     db.write();
//     return updateContacts.id ? updateContacts : null;
//   }

//   removeContact(id) {
//     const [result] = db.get("contacts").remove({ id }).write();
//     return result;
//   }
// }

module.exports = RepositoryContacts;
