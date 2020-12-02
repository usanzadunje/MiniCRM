const mysql = require('mysql');
const nodemailer = require('nodemailer');
const env = require('../MiniCRM/env');

let conn = mysql.createConnection(env.mysql);

let mailer = {
    transporter: nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        service: 'gmail',
        auth: env.email
    }),

    mailOptions: mailOptions = (to, subject, html,) => {
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