// const jest = require("jest")
const guard = require("../helpers/guard");
const passport = require("../config/passport")
const { HttpCode } = require("../helpers/constants");
const { User } = require("../service/__mocks__/data");



describe("unit test: helpers/guard", () => {

 const req = { user: User};
  
 
 const res = {
     status:jest.fn().mockReturnThis(),
     json: jest.fn( responce => responce),
 }
const next = jest.fn()

    test("works with an authorized user", () => {
        guard()(req,res,next)       
        expect(next).toHaveBeenCalled()
    })
    test("works with an unauthorized user", () => {})
})
