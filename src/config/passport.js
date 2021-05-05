const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
require("dotenv").config();
const { ServiceUsers } = require("../service");

const SecretKey = process.env.JWT_SECRET_WORD;

const params = {
  secretOrKey: SecretKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};
passport.use(
  new Strategy(params, async (payload, done) => {
    try {
      const service = new ServiceUsers();
      const user = await service.findUserById(payload.userid);

      if (!user) {
        return done(new Error("Not Found"));
      }
      if (!user.token) {
        return done(null, false);
      }

      return done(null, user);
    } catch (e) {
      done(e);
    }
  })
);
