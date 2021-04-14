const mongoose = require("mongoose");

require("dotenv").config();

const uribD = process.env.URI_DB;
const db = mongoose.connect(uribD, {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser:true,
  useFindAndModify: false,
  poolSize: 5,
});

mongoose.connection.on("connected",() => {
    console.log(`Mongoose connection`);

})

mongoose.connection.on("error",(err) => {
    console.log(`Error connection: ${err.message}`)});



process.on("signin",() => {
mongoose.connection.close(()=>{
    console.log("connection lost");
    process.exit();
})
 
});
module.exports = db;

// const low = require("lowdb");
// const path = require("path");

// const FileSync = require ("lowdb/adapters/FileSync");
// const adapter = new FileSync(path.join(__dirname, "..", "..", "data", "db.json"));

// const db = low(adapter);
// db.defaults({contacts: []}).write();
