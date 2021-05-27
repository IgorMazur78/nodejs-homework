const Mailgen  = require("mailgen");
require("dotenv").config()


const createTemplateEmail = (verifyToken, name)=> {
 const url = 'http://localhost:8080';
    const mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            
            name: 'My Contacts',
            link: url
            
        }
    });
     
    const email = {
        body: {
            name,
            intro: 'Welcome to My Contacts! We\'re very excited to have you on board.',
            action: {
                instructions: 'To get started with My Contacts, please click here:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Confirm your account',
                    link: `${url}/api/users/verify/${verifyToken}`
                }
            }
                    }
    };
    const emailBody = mailGenerator.generate(email);
return emailBody
}
module.exports = createTemplateEmail;