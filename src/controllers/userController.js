const { ServiceUsers, Auth } = require("../service");
const { HttpCode } = require("../helpers/constants");

const serviceUser = new ServiceUsers();
const serviceAuth = new Auth();

const regisration = async (req, res, next) => {
  const { name, email, password, subscription } = req.body;
  const user = await serviceUser.findUserByEmail(email);
  if (user) {
    return next({
      status: HttpCode.CONFLICT,
      data: "Conflict",
      message: "a client with this email already exists",
    });
  }
  try {
    const newUser = await serviceUser.create({
      name,
      email,
      password,
      subscription,
    });
    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await serviceAuth.login(email, password);
    console.log("🚀 ~ file: userController.js ~ line 44 ~ login ~ user", user)
    const token = user.token;
    const subscription = user.subscription;
    if (token) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          token,
          user: {
            email,
            subscription,
          },
        },
      });
    }
    next({
      status: HttpCode.UNAUTHORIZED,
      message: "Email or password is wrong",
    });
  } catch (e) {
    next(e);
  }
};
const logout = async (req, res, next) => {
  const id = req.body;
  try {
    const user = await serviceUser.findUserById(id);
    const token = user.token;
    const userId = user.id;
    if (!token) {
      res.status(HttpCode.UNAUTHORIZED).json({
        message: "UNAUTHORIZED",
      });
     
    }
    await serviceAuth.logout(userId)
    res.status(HttpCode.OK).json({
      status:"success",
      message: "User logged out",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  regisration,
  login,
  logout,
};
