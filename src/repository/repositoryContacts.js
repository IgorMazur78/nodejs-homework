const Contact = require("../schema/schemaContact");

class RepositoryContacts {
  constructor() {
    this.modelContact = Contact;
  }

  async getAllContacts({ limit = 5, offset = 0, sortBy, sortByDesc, filter }) {
    const {
      docs: contacts,
      totalDocs: total,
    } = await this.modelContact.paginate(
      {},
      {
        limit,
        offset,
        sort: {
          ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
          ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
        },
        select: filter ? filter.split("|").join(" ") : " ",
      }
    );

    return { contacts, total, limit: Number(limit), offset: Number(offset) };
  }

  async getById(userid, id) {
    const result = await this.modelContact.findOne({ _id: id, owner: userid });
    return result;
  }

  async createContact(userid, body) {
    const newContact = await this.modelContact.create({
      ...body,
      owner: userid,
    });
    return newContact;
  }

  async updateContact(userid, id, body) {
      
    const result = await this.modelContact.findByIdAndUpdate(
      { _id: id, owner: userid },
      { ...body },
      { new: true }
    );
    return result;
  }

  async removeContact(userid, id) {
  console.log("🚀 ~ file: repositoryContacts.js ~ line 52 ~ RepositoryContacts ~ removeContact ~ userid", userid)
  
 
       const result = await this.modelContact.findByIdAndRemove({
      _id: id,
      owner: userid,
    });
    return result;
  }
}

module.exports = RepositoryContacts;
