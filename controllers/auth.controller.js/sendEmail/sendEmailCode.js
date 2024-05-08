

const nodemailer = require('nodemailer');

const sendEmailWithNaodeMailer = (userEmail, updatecode, name) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: `${userEmail}`,
        subject: `Hello Sir ${name}`,
        text: ` ${updatecode} This is a test code email sent using Nodemailer and islam jamal .  `
    };


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred:', error.message);
        } else {
            console.log('Email sent successfully:', info.response);
        }
    });

}




module.exports = sendEmailWithNaodeMailer