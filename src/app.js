const express  = require("express");
const cors = require("cors");
const routerContacts = require("./api/contacts")
const routerUsers = require("./api/user")


const {HttpCode} = require("./helpers/constants")
require("dotenv").config()

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/api/contacts", routerContacts);
app.use("/api/users", routerUsers );

app.use((req,res,next) => {
    res.status(HttpCode.NOT_FOUND).json({
        status:"error",
        code:HttpCode.NOT_FOUND,
        message:`Use api on ${req.baseUrl}/api/contacts`,
        data:`Not Found`

    })
    next()
})
app.use((err,req,res,next) => {
    console.log(err);
    
    err.status = err.status ? err.status : HttpCode.INTERNAL_SERVER_ERROR
    res.status(err.status).json({
        
        status: err.status === 500 ? "fail" : "ERROR",
        code:err.status,
        message:err.message,
        data: err.status === 500 ? "INTERNAL SERVER ERROR" : err.data

    })
    next()
}
)
module.exports = app;


