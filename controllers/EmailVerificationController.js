const bcrypt = require('bcrypt');
const conn = require('../config').conn;
const mailer = require('../config').mailer;
const Str = require('@supercharge/strings');
const ejs = require('ejs');
const path = require('path');

module.exports = {

    verificationNotice: function (req, res, next) {
        console.log(req.flash('verification-email-sent'));
        return res.render('emails/notice');
    },

    verificationSend: function (req, res, next) {
        req.session.user.emailSecret = Str.random(20);
        let hash = bcrypt.hashSync(req.session.user.emailSecret, 10);

        ejs.renderFile(path.join(__dirname, "../views/emails/verification_email.ejs"), {
            id: req.session.user.id,
            hash: hash.replace(/\//g, "slash")
        },
            function (err, data) {
                if (err) {
                    throw err;
                }
                mailer.transporter.sendMail(mailer.mailOptions(
                    req.session.user.email,
                    'E-mail verification [MiniCRM]',
                    data,
                    (err, info) => {
                        if (err) throw err;
                        console.log('E-mail sent');
                    }
                ));
                req.flash('success', 'A new verification link has been sent to the email address you provided during registration.');
                res.redirect('/email/verify')
            });
    },

    verificationVerifyc: function (req, res, next) {
        if (req.session.user.id === parseInt(req.params.id) && bcrypt.compareSync(req.session.user.emailSecret, req.params.hash.replace(/slash/g, '/'))) {
            delete req.session.user.emailSecret;
            let today = new Date(Date.now());
            let now = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()} ${today.getHours()}-${today.getMinutes()}-${today.getSeconds()}`

            let query = `UPDATE users SET email_verified_at = '${now}' WHERE id = ${req.params.id}`;

            conn.query(query, (err, result) => {
                if (err) throw err;

                req.session.user.email_verified_at = now;
                res.locals.user.email_verifed_at = now;

                req.flash('success', 'You have verified your e-mail successfully..');
                res.redirect('/home');
            })
        }
        else {
            req.flash('danger', 'Something is wrong with your verification e-mail. Please try again..');
            res.redirect('/email/verify');
        }
    }
}