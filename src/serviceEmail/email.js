const nodemailer = require("nodemailer");
// const Mailgen = require("mailgen");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
      user: 'mazur_igor78@meta.ua',
      pass: process.env.PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
  
},
{
  from:'mazur_igor78@meta.ua'
},
)

const mailer  = (message) => {
  transporter.sendMail(message, (err,info) => {
    if(err) return console.log("error:", err);
      console.log('email send:', info);   

  })

}

module.exports = mailer

// const transporter = nodemailer.createTransport(config)
// const emailOptions = {
//   from:'mazur_igor78@meta.ua',
//   to: 'spanishman0605@gmail.com',
//   subject: 'Nodemailer test',
//   text: 'Привет. Мы тестируем отправку писем!',
// }
// transporter
//   .sendMail(emailOptions)
//   .then((info) => console.log("новое сообщение:",info))
//   .catch((err) => console.log("сообщение об ошибке:", err))

// module.exports = transporter;