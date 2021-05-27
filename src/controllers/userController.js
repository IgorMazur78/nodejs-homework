// const Jimp = require("jimp");
const fs = require("fs").promises;
// const path = require("path");
const mailer = require("../serviceEmail/email")
const createTemplateEmail = require("../serviceEmail/templateEmail")


const cloudinary = require("cloudinary").v2;
const { promisify } = require("util");

const { ServiceUsers, Auth } = require("../service");
const { HttpCode } = require("../helpers/constants");
require("dotenv").config();

// const { fchmod } = require("fs");
const serviceUser = new ServiceUsers();
const serviceAuth = new Auth();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY_CLOUD,
  api_secret: process.env.API_SECRET,
});
const uploadCloudy = promisify(cloudinary.uploader.upload);
const regisration = async (req, res, next) => {
 
  const { name, email, password, subscription, avatar, verifyToken } = req.body;
  const message = {
  to: email,
  subject: 'Nodemailer test',
  // text: 'Привет. Мы тестируем отправку писем!',
  html: createTemplateEmail(verifyToken, name),

}
  
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
      avatar,
    });
       mailer(message);
        return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        subscription: newUser.subscription,
        avatar: newUser.avatar,
      },
    });
  } catch (e) {
    next(e);
  }
};
const verifyToken = async (req, res, next) => {
   
  try {
    const user = await serviceUser.findUserByToken(req.params.token)
    
           if (user) {
         await serviceUser.updateVerifyToken(user.id, true,null)
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          message: "Verification successfull",
           },
        
      });
    }
    next({
      status: HttpCode.BAD_REQUEST,
      message: "Token is wrong",
    })
    
  } catch (error) {
    next(error)
  }
}

const verifyTokenEmail = async (req,res,next) => {
  try {

    const user = await serviceUser.findUserByEmail(req.body.email);
    if(user){
      const { email, name, verifyTokenEmail} = user;
const message = {
  to: email,
  subject: 'Nodemailer test',
  // text: 'Привет. Мы тестируем отправку писем!',
  html: createTemplateEmail(verifyTokenEmail, name),

}
mailer(message)
return res.status(HttpCode.OK).json({
  status: "success",
  code: HttpCode.OK,
  data: {
    message: "Verification successfull, email resubmitted",
     },
  
});
    }
    return res.status(HttpCode.NOT_FOUND).json({
      status: "Error",
      code: HttpCode.NOT_FOUND,
      data: {
        message: "User is wrong",
         },
      
    });


  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await serviceAuth.login(email, password);
    const token = user.token;
    const subscription = user.subscription;
    if (token ) {
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
      message: "Email or password or verifyToken is wrong",
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

  try {
    const result = await serviceUser.findUserAndUpdateStatus(id, body);
    res.status(HttpCode.OK).json({
      status: "success",
      message: "status update",
    });
    return result;
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

const updateAvatar = async (req, res, next) => {
  try {
    const { id } = req.user;

    const { idCloudAvatar, avatarUrl } = await saveAvatarCloud(req);

    await serviceUser.updateAvatar(id, avatarUrl, idCloudAvatar);
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      message: "Avatar user update",
      data: { avatarUrl },
    });
  } catch (error) {
    next(error);
  }
};

// const saveAvatar = async (req) => {

//   const FOLDERS_AVATARS = process.env.FOLDERS_AVATARS;
//     const pathFile = req.file.path;
//   const newNameAvatar = `${Date.now().toString()}-${req.file.originalname}`;

//   const img = await Jimp.read(pathFile);

//   await img
//     .autocrop()
//     .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
//     .writeAsync(pathFile);

//   await fs.rename(
//     pathFile,
//     path.join(process.cwd(), "public", FOLDERS_AVATARS, newNameAvatar)
//   );
//   const oldAvatar = req.user.avatar;
//   if(req.user.avatar.includes(`${FOLDERS_AVATARS}/`)){

//     await fs.unlink(path.join(process.cwd(), "public", oldAvatar))
//   }

//   return path.join(FOLDERS_AVATARS, newNameAvatar);
// };

const saveAvatarCloud = async (req) => {
  const pathFile = req.file.path;
  const {
    public_id: idCloudAvatar,
    secure_url: avatarUrl,
  } = await uploadCloudy(pathFile, {
    public_id: req.user.idCloudAvatar?.replace("Avatars/", ""),
    folder: "Avatars",
    transformation: { width: 250, height: 250, crop: "pad" },
  });

  await fs.unlink(pathFile);

  return { idCloudAvatar, avatarUrl };
};

module.exports = {
  regisration,
  verifyToken,
  verifyTokenEmail,
  login,  
  getCurrentUser,
  userUpdateStatus,
  updateAvatar,
  logout,
};
