const conn = require('../config').conn;
const bcrypt = require('bcrypt');

module.exports = {

    makeAdmin: function (req, res, next) {
        let role = 'regular';
        if (req.body.role === 'regular') role = 'admin';
        let query = `UPDATE users
                     SET role = '${role}'
                     WHERE id = ${req.params.id}`;

        conn.query(query, (err, result) => {
            if (err) throw err;

            req.flash('success', 'You successfully granted admin permissions to user..')
            res.redirect('/users');

        });
    },

    manualEmailVerification: function (req, res, next) {
        let today = new Date(Date.now());
        let now = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()} ${today.getHours()}-${today.getMinutes()}-${today.getSeconds()}`
        let query = `UPDATE users
                     SET email_verified_at = '${now}'
                     WHERE id = ${req.params.id}`;

        conn.query(query, (err, result) => {
            if (err) throw err;

            req.flash('success', 'You successfully verified e-mail to user..')
            res.redirect('/users');

        });
    },

    index: function (req, res, next) {
        let query = `SELECT id, name, email, email_verified_at, role FROM users WHERE id != ${parseInt(req.session.user.id)}`;
        let i = 0;

        conn.query(query, (err, result) => {
            if (err) throw err;

            return res.render('users/index', {
                users: result,
                i
            });

        });
    },

    show: function (req, res, next) {
        return res.render('users/show');
    },

    edit: function (req, res, next) {
        return res.render('users/edit');
    },

    update: function (req, res, next) {
        if (req.body.password === req.body.password_confirmation) {
            let query = `UPDATE users SET 
                        name = '${req.body.name}', 
                        email = '${req.body.email}',
                        password = '${bcrypt.hashSync(req.body.password, 10)}'
                        WHERE id = ${res.locals.user.id}`;
            conn.query(query, (err, result) => {
                if (err) throw err;
                let query = `SELECT id, name, email, provider, email_verified_at, role FROM users WHERE id = ${res.locals.user.id}`;

                conn.query(query, (err, user) => {
                    if (err) throw err;

                    res.locals.user = user[0];
                    req.session.user = user[0];

                    req.flash('success', 'You account has been updated successfully..');
                    res.redirect('/users/show');
                });
            });
        }
        else {
            req.flash('danger', 'Your passwords do not match. Try again..');
            res.redirect('/users/edit');
        }
    },

}