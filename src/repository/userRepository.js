const User = require("../schema/schemaUser");

class UserRepository {
  constructor() {
    this.model = User;
  }
  
  async findUserbyId (id) {
    const result = await this.model.findOne({ _id:id })
   
    return result;
  }
  
  async findUserByEmail(email) {
    const result = await this.model.findOne({ email });
    return result;
  }

  async createUser(body, useId) {
    // eslint-disable-next-line new-cap
    const user = new this.model({...body, owner: useId});
    return user.save();
  }

  async updateToken(id, token) {
    await this.model.updateOne({ _id: id }, { token });
  }
}
module.exports = UserRepository;
