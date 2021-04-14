const app = require("./app");
const db = require("./db/db");

const PORT = process.env.PORT || 3030
db.then(() => {
    app.listen(PORT, () => {
        console.log(`server running.example app listen on ${PORT}`)  })
})
.catch(err => {
    console.log(`the server is not running. Error message ${err.message}`);
    
})


