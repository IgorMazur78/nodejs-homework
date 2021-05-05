const { UsersRepository } = require("../repository");

class ServiceUsers {
  constructor() {
    this.repositories = {
      serviceUser: new UsersRepository(),
    };
  }

  async create(body) {
    const dataUser = await this.repositories.serviceUser.createUser(body);
    return dataUser;
  }

  async findUserByEmail(email) {
    const data = await this.repositories.serviceUser.findUserByEmail(email);
    return data;
  }

  async findUserAndUpdateStatus (useid, body) {
    const newSatusUser = await this.repositories.serviceUser.updateStatus(useid,body);
    return newSatusUser

  }

  async findUserById(id) {
    
    const data = await this.repositories.serviceUser.findUserbyId(id);
    
    
    return data;
  }
}
module.exports = ServiceUsers;
