const { RepositoryContacts } = require("../repository");


class Service {
  constructor() {
    process.nextTick(()=>{
     
      this.repositories = {
        contacts: new RepositoryContacts(),
      }
    })
    
  }

  async getAllContacts(query) {
    const allContacts = await this.repositories.contacts.getAllContacts(query);
    return allContacts;
  }

  async getContactsById({ id, userId }) {
    const contactById = await this.repositories.contacts.getById(id, userId);
    return contactById;
  }
  
  async createContact(body,userId) {
    const newContact = await this.repositories.contacts.createContact(body,userId);
    return newContact;
  }

  async updateContact({ id }, body, userId) {
    const update = await this.repositories.contacts.updateContact(id, body, userId);
    return update;
  }

  async removeContact({ id , userId}) {
    const deleteContact = await this.repositories.contacts.removeContact(id, userId);
    return deleteContact;
  }
}
module.exports = Service;
