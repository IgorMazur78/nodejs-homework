const { HttpCode } = require("../helpers/constants");
const { Service} = require("../service");
const serviceContacts = new Service;

const getAll = (req,res,next) => {
try{
    const contacts = serviceContacts.getAllContacts()
    return res.status(HttpCode.OK).json({
status:"succes",
code: HttpCode.OK,
data:{
    contacts
}
    })
}
catch(err){
    next(err)

}
}
const getById = (req,res,next) => {
    try{
        const contact = serviceContacts.getContactsById(req.params)
     if(contact) {
        return res.status(HttpCode.OK).json({
            status:"success",
            code: HttpCode.OK,
            data:{
                contact
            }
                })
     } else {
         return next({
             status:HttpCode.NOT_FOUND,
             message: "NOT FOUND",
             data:"NOT FOUND"
         })
     } 
    }
    catch(err){
        next(err)
    
    }
    } 
    const create = (req,res,next) =>{
        
        try{
            const contact = serviceContacts.createContact(req.body);
            return res.status(HttpCode.CREATED).json({
                status:"success",
                code: HttpCode.CREATED,
                message: "Contact Created",
                data:{
                    contact,
                }
            })
        }
        catch(e){
            next(e)
        }
    }
    const update = (req,res,next) => {
        try{
            const contact = serviceContacts.updateContact(req.params, req.body)
         if(contact) {
            return res.status(HttpCode.OK).json({
                status:"success",
                code: HttpCode.OK,
                data:{
                    contact
                }
                    })
         } else {
             return next({
                 status:HttpCode.NOT_FOUND,
                 message: "NOT FOUND",
                 data:"NOT FOUND"
             })
         } 
        }
        catch(err){
            next(err)
        
        }
        }
        const remove = (req,res,next) => {
            try{
                const contact = serviceContacts.removeContact(req.params)
             if(contact) {
                return res.status(HttpCode.OK).json({
                    status:"success",
                    code: HttpCode.OK,
                    data:{
                        contact
                    }
                        })
             } else {
                 return next({
                     status:HttpCode.NOT_FOUND,
                     message: "NOT FOUND",
                     data:"NOT FOUND"
                 })
             } 
            }
            catch(err){
                next(err)
            
            }
            } 
        

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove }
