const {RepositoryContacts} = require("../repository");

class Service {
    constructor(){
        this.repositories = {
            contacts: new RepositoryContacts()
        }
    };

    getAllContacts(){
        const allContacts = this.repositories.contacts.getAllContacts()
        return allContacts
    }

    getContactsById({id}){
        const contactById = this.repositories.contacts.getById(id)
        return contactById
    }

    createContact(body){
        const newContact = this.repositories.contacts.createContact(body)
        return newContact;

    }

    updateContact({id}, body){
        const update = this.repositories.contacts.updateContact(id, body)
        return update
    }

    removeContact({id}){
        const deleteContact = this.repositories.contacts.removeContact(id)
        return deleteContact
    }


}
module.exports = Service
