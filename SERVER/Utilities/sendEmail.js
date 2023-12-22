const nodemailer = require('nodemailer')
require('dotenv').config()
const path = require('path')
const pug = require('pug')


const sendMail = async (username, otp, email, url, subject, templateFile) => {

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        service: process.env.SMTP_SERVICE,
        auth:{
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false, // Trust self-signed certificates
        }
    });

    // Compile the Pug template
    const template = path.join(__dirname, '..', 'views', templateFile);
    const compiledFunction = pug.compileFile(template);

    // Render the HTML using the compiled Pug template
    const html = compiledFunction({ username, otp, url });

    const message = {     
            from: {
                name: "PickNPay",
                address: process.env.SMTP_MAIL,
            },
            to: email,
            subject: subject,
            html: html
    };

    return await transporter.sendMail(message);

}

module.exports = {
    sendMail
}