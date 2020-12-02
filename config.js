const mysql = require('mysql');
const nodemailer = require('nodemailer');


let conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'minicrm',
    port: 3308
});

let mailer = {
    transporter: nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        service: 'gmail',
        auth: {
            user: 'dussan96@gmail.com',
            pass: 'lxoxqkfewkuwrflg'
        }
    }),

    mailOptions: mailOptions = (to, subject, html, context) => {
        return {
            from: 'dussan96@gmail.com',
            to: to,
            subject: subject,
            html: html,
        }
    },
};


module.exports = {
    conn,
    mailer,
};