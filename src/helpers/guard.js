const passport = require("passport");
require("../config/passport");
const { HttpCode } = require("../helpers/constants");

const guard = (req, res, next) => {

  passport.authenticate("jwt", { session: false }, (err, user) => {
    
    const [, token] = req.get("Authorization")?.split(" ");
    
    if (err || !user || token !== user.token) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: "error",
        code: HttpCode.UNAUTHORIZED,
        messange: "UNAUTHORIZED",
      });
    }

    req.user = user;
    
    return next();
  })(req, res, next);
};
module.exports = guard;
