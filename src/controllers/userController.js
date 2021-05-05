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

const getCurrentUser = async (req, res, next) => {
  const { name, email, subscription } = req.user;

  try {
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      message: `Authorization was successful: ${name}`,
      data: {
        "user name": name,
        email: email,
        subscription: subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const userUpdateStatus = async (req, res, next) => {
  const { id } = req.user;
  const body = req.body;
  console.log("🚀 ~ file: userController.js ~ line 89 ~ userUpdateStatus ~ body", body)

  try {
    
    const result = await serviceUser.findUserAndUpdateStatus(id, body);
       res.status(HttpCode.OK).json({
      status: "success",
      message: "status update",
    });
    return result
    
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  const id = req.body;
  try {
    const user = await serviceUser.findUserById(id);
    const token = user.token;
    const userid = user._id;
    if (!token) {
      res.status(HttpCode.UNAUTHORIZED).json({
        message: "UNAUTHORIZED",
      });
    }
    await serviceAuth.logout(userid);
    res.status(HttpCode.OK).json({
      status: "success",
      message: "User logged out",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  regisration,
  login,
  getCurrentUser,
  userUpdateStatus,
  logout,
};
