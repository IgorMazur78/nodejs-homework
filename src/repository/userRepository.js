const User = require("../schema/schemaUser");

class UserRepository {
  constructor() {
    this.model = User;
  }
  
  async findUserbyId (id) {
        const result = await this.model.findOne({ _id: id} )
      
    return result;
  }
  
  async findUserByEmail(email) {
    const result = await this.model.findOne({ email });
    return result;
  }

  async createUser(body, userId) {
    // eslint-disable-next-line new-cap
    const user = new this.model({...body, owner: userId});
    return user.save();
  }

  async updateStatus(id,subscription){
    const newUserStatus = await this.model.findByIdAndUpdate( id , {... subscription },{ new:true});
    
    return newUserStatus
  }

  async updateToken(id, token) {
    const newUserToken = await this.model.findByIdAndUpdate(id, { token },{ new: true});
    
    return newUserToken

  }

  async updateAvatar(id, avatar, idCloudAvatar ) {
    const newUserAvatar = await this.model.findByIdAndUpdate(id, { avatar, idCloudAvatar }, { new: true});
    
    return newUserAvatar

  }
}
module.exports = UserRepository;
