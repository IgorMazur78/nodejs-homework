const Contact = require("../schema/schemaContact");

class RepositoryContacts {
  constructor() {
    // this.collection = client.db().collection("contacts");
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

  async getById(id, userId) {
    const result = await this.modelContact.findOne({ _id: id, owner: userId });
    return result;
  }

  async createContact(body, userId) {
    const newContact = await this.modelContact.create({...body, owner:userId});
    return newContact;
  }

  async updateContact(id, body, userId) {
    const result = await this.modelContact.findByIdAndUpdate(
      { _id: id, owner: userId },
      { ...body },
      { new: true }
    );
    return result;
  }

  async removeContact(id, userId) {
    const result = await this.modelContact.findByIdAndRemove({
      _id: id,
      owner: userId,
    });
    return result;
  }
}

module.exports = RepositoryContacts;
