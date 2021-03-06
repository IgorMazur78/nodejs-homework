const { HttpCode } = require("../helpers/constants");
const { Service } = require("../service");
const serviceContacts = new Service();

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contacts = await serviceContacts.getAllContacts(req.query, userId);
    return res.status(HttpCode.OK).json({
      status: "succes",
      code: HttpCode.OK,
      data: {
        ...contacts,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const contact = await serviceContacts.getContactsById(req.params, userId);
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: "NOT FOUND",
        data: "NOT FOUND",
      });
    }
  } catch (err) {
    next(err);
  }
};
const create = async (req, res, next) => {
  try {
    const userId = req.user?.id;
              
    const contact = await serviceContacts.createContact(req.body,userId);

    return res.status(HttpCode.CREATED).json({
    
      status: "success",
      code: HttpCode.CREATED,
      message: "Contact Created",
      data: {
        contact,
      },
    });
  } catch (e) {
    next(e);
  }
};
const update = async (req, res, next) => {
  try {
    const userId = req.user?.id;
     
    const contact = await serviceContacts.updateContact(
      userId,
      req.params,
      req.body
    );

    if (contact) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: "NOT FOUND",
        data: "NOT FOUND",
      });
    }
  } catch (err) {
    next(err);
  }
};
const remove = (req, res, next) => {
  try {
    const userId = req.user?.id;
    
    const contact = serviceContacts.removeContact(userId, req.params);
    
      
    if (contact) {
    
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: "NOT FOUND",
        data: "NOT FOUND",
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
