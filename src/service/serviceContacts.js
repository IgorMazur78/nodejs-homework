const { RepositoryContacts } = require("../repository");


class Service {
  constructor() {
    process.nextTick(()=>{
     
      this.repositories = {
        contacts: new RepositoryContacts(),
      }
    })
    
  }

  async getAllContacts(query,userid) {
    const allContacts = await this.repositories.contacts.getAllContacts(userid,query);
    return allContacts;
  }

  async getContactsById({ id}, userid ) {
    const contactById = await this.repositories.contacts.getById(userid, id);
    return contactById;
  }
  
  async createContact( body, userid) {

    const newContact = await this.repositories.contacts.createContact(userid, body);
    return newContact;
  }

  async updateContact(userid, { id }, body ) {
    const update = await this.repositories.contacts.updateContact(userid,id, body );
    return update;
  }

  async removeContact(userid, { id }) {
    const deleteContact = await this.repositories.contacts.removeContact(userid, id, );
    return deleteContact;
  }
}
module.exports = Service;
