// const jest = require("jest")
const guard = require("../helpers/guard");
const passport = require("../config/passport")
const { HttpCode } = require("../helpers/constants");
const { User } = require("../service/__mocks__/data");



describe("unit test: helpers/guard", () => {

 const req = { get:jest.fn((header) => `Bearer ${User.token}`), user: User}; 
 


 const res = {
     status:jest.fn().mockReturnThis(),
     json: jest.fn( responce => responce),
 }
const next = jest.fn()

    test("works with an authorized user", () => {
        passport.authenticate = jest.fn((authType,options, callback) => () => {
            callback(null,User)
        })
        guard(req,res,next);       
        expect(next).toHaveBeenCalled()
    })
    test("user is missing", () => {
        passport.authenticate = jest.fn((authType,options, callback) => (req,res,next) => {
            callback(null,false)
        })
        guard(req,res,next);       
        expect(req.get).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalled()
        expect(res.json).toHaveBeenCalled()
        expect(res.json).toHaveReturnedWith(
            {
                 status: "error",
                 code: HttpCode.UNAUTHORIZED,
                 messange: "UNAUTHORIZED",

            }
        )
    })
    
    test("the token is not valid", () => {
        passport.authenticate = jest.fn((authType,options, callback) => (req,res,next) => {
            callback(null,{token: null})
        })
        guard(req,res,next);       
        expect(req.get).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalled()
        expect(res.json).toHaveBeenCalled()
        expect(res.json).toHaveReturnedWith(
            {
                 status: "error",
                 code: HttpCode.UNAUTHORIZED,
                 messange: "UNAUTHORIZED",

            }
        )
    })
})
