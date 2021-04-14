const { RepositoryContacts } = require("../repository");
const db =require("../db/db");

class Service {
  constructor() {
    process.nextTick(()=>{
     
      this.repositories = {
        contacts: new RepositoryContacts(),
      }
    })
    
  }

  async getAllContacts() {
    const allContacts = await this.repositories.contacts.getAllContacts();
    return allContacts;
  }

  async getContactsById({ id }) {
    const contactById = await this.repositories.contacts.getById(id);
    return contactById;
  }

  async createContact(body) {
    const newContact = await this.repositories.contacts.createContact(body);
    return newContact;
  }

  async updateContact({ id }, body) {
    const update = await this.repositories.contacts.updateContact(id, body);
    return update;
  }

  async removeContact({ id }) {
    const deleteContact = await this.repositories.contacts.removeContact(id);
    return deleteContact;
  }
}
module.exports = Service;
