const { UsersRepository } = require("../../repository");

class ServiceUsers {
  constructor() {
    this.repositories = {
      serviceUser: new UsersRepository(),
    };
  }

  async create(body) {
    const dataUser = jest.fn( this.repositories.serviceUser.createUser(body));
    return dataUser;
  }

  async findUserByEmail(email) {
    const data = jest.fn( this.repositories.serviceUser.findUserByEmail(email));
    return data;
  }

  async findUserAndUpdateStatus (useid, body) {
    const newSatusUser = jest.fn(this.repositories.serviceUser.updateStatus(useid,body));
    return newSatusUser

  }

  async findUserById(id) {
    
    const data = jest.fn (this.repositories.serviceUser.findUserbyId(id));
    
    
    return data;
  }

  async updateAvatar(id, avatar, idCloudAvatar){

    const data = jest.fn(this.repositories.serviceUser.updateAvatar(id,avatar, idCloudAvatar))
    return data
  }
}
module.exports = ServiceUsers;
