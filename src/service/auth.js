const { UsersRepository } = require("../repository");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET_WORD;

class Auth {
  constructor() {
    this.repositories = {
      authUser: new UsersRepository(),
    };
  }

  async login(email, password) {
    const user = await this.repositories.authUser.findUserByEmail(email);
    const validPassword = await user.validPassword(password)
      if (!user || !validPassword) {
      return null;
    }
    const userid = user.id;
    const payload = { userid };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await this.repositories.authUser.updateToken(userid, token);
    return user;
  }

  async logout(id) {
    const userLogout = await this.repositories.authUser.updateToken(id, null);
    return userLogout;
  }
}

module.exports = Auth;
