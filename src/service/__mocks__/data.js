const contacts = [
    {
        _id:"6091c199717a9d31242dbb28",
shopCustomer:false,
name:"Irusik",
email:"irusik@gmail.com",
phone:"0996803635",
owner:"60910b18b6a01a1f28c6f939",

    },
    {
        _id:"6091d1189cc9062c0c174570",
shopCustomer:false,
name:"eee",
email:"eee@gmail.com",
phone:"0996803635",
owner:"60910b18b6a01a1f28c6f939",

    }
]

const newContact = {
    shopCustomer: false,
    name: "New",
    email:"New@gmail.com",
    phone:"NewPhone",

}
const User = {
    _id:"60910b18b6a01a1f28c6f939",
subscription:"pro",
token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2MDkxMGIxOGI2YTAxYTFmMjhjNmY5MzkiLCJpYXQiOjE2MjA2NzgwNDUsImV4cCI6MTYyMDY4MTY0NX0.bQ-K9PllJKGf8JxBe4fedJYwqdWW3K8giOeE-V6tqDo",
name:"Yura",
email:"yura@gmail.com",
password:"$2a$06$.GJx1iDUYD/dbn8IklzUDeYxd4CP4wO3XK/ylwLfAUshBqw6fKbJe",
createdAt:"2021-05-04T08:51:36.723+00:00",
updatedAt:"2021-05-09T20:41:25.388+00:00",
avatar:"https://res.cloudinary.com/dxmkhhipg/image/upload/v1620592882/Avatars/kuyn1sm5lhjcpiw6owge.jpg"

}

const users = [];
users[0]= User;
const newUser = { name : "New User", email: "newEmail@gmail.com", password: "qwe123"}
module.exports = {
    newUser,
    users,
    User,
    newContact,
    contacts



}