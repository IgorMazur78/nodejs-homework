const {v4: uuid} = require("uuid");
const db = require("../db/db");

class RepositoryContacts {
    constructor() {}

    getAllContacts() {
        return db.get("contacts").value()
    }

    getById(id) {
        const result = db.get("contacts").find({id}).value()
        return result
    }

    createContact(body) {
        const id = uuid();
        const newContact = {
           id,
          ...body
        };
        db.get("contacts").push(newContact).write();
        return newContact
    }

    updateContact(id,body) {
    const updateContacts = db.get("contacts").find({id}).assign(body).value();
    db.write()
    return updateContacts.id ? updateContacts : null;
    }

removeContact(id) {
    const [result] = db.get("contacts").remove({id}).write()
    return result
}
}

module.exports = RepositoryContacts;
