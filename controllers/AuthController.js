const bcrypt = require('bcrypt');
const conn = require('../config').conn;
const mysql = require('mysql');
const Str = require('@supercharge/strings');

module.exports = {

    index: function (req, res, next) {
        return res.render('users/index');
    },

    login: function (req, res, next) {
        if (req.method === 'GET') {
            return res.render('auth/login');
        }
        if (req.method === 'POST') {
            let email = req.body.email;
            let password = req.body.password;

            let query = `SELECT * FROM users WHERE email LIKE ${mysql.escape(email)}`;
            conn.query(query, (err, result) => {
                if (err) throw err;
                if (result.length != 0) {
                    if (bcrypt.compareSync(password, result[0].password)) {
                        res.locals.user = result[0];
                        req.session.user = {
                            id: result[0].id,
                            name: result[0].name,
                            email: result[0].email,
                            email_verified_at: result[0].email_verified_at,
                            role: result[0].role
                        }
                        req.flash('success', 'You have been logged in successfully!');
                        res.redirect('/home');
                    }
                    else {
                        req.flash('danger', 'Invalid password!');
                        req.flash('email', email);
                        res.redirect('/login');
                    }
                }
                else {
                    req.flash('danger', 'We do not have user with entered e-mail in our system.');
                    res.redirect('/login');
                }
            })
        }
    },

    register: function (req, res, next) {
        if (req.method === 'GET') {
            return res.render('auth/register');;
        }
        if (req.method === 'POST') {
            if (req.body.password === req.body.password_confirmation) {
                let query = `SELECT id FROM users WHERE email LIKE ?`;
                conn.query(query, req.body.email, (err, emailExists) => {
                    if (err) throw err;
                    if (emailExists.length === 0) {
                        let query = `INSERT INTO users(name, email, password, role) VALUES('${req.body.name}', '${req.body.email}', '${bcrypt.hashSync(req.body.password, 10)}', '${role}')`;
                        conn.query(query, (err, result) => {
                            if (err) throw err;
                            console.log(`User added. ID: ${result.insertId}`);
                            req.flash('success', 'You account has been created successfully. Please log in to proceed..');
                            res.redirect('/login');
                        });
                    }
                    else {
                        req.flash('danger', 'User with that e-mail already exists..');
                        req.flash('name', req.body.name);
                        res.redirect('/register');
                    }
                });

            }
            else {
                req.flash('danger', 'Your passwords do not match. Try again..');
                req.flash('name', req.body.name);
                req.flash('email', req.body.email)
                res.redirect('/register');
            }
        }
    },

    logout: function (req, res, next) {
        delete req.session['user'];
        res.redirect('/login');
    },

    facebookLogin: function (req, res) {
        console.log(req.user);
        let name = req.user.displayName;
        let email = req.user.emails[0].value;
        let password = Str.random(30);

        let query = `SELECT * FROM users WHERE email LIKE ?`;
        conn.query(query, email, (err, emailExists) => {
            if (err) throw err;
            if (emailExists.length > 0 && emailExists[0].provider === '') {
                req.flash('danger', 'User with that e-mail already exists..');
                res.redirect('/login');
            }
            else if (emailExists.length === 0) {
                let today = new Date(Date.now());
                let now = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()} ${today.getHours()}-${today.getMinutes()}-${today.getSeconds()}`
                let query = `INSERT INTO users(name, email, password, provider, email_verified_at, role) VALUES('${name}', '${email}', '${bcrypt.hashSync(password, 10)}', 'facebook', ${now}, 'regular')`;
                conn.query(query, (err, result) => {
                    if (err) throw err;
                    console.log(`User added. ID: ${result.insertId}`);
                    req.session['user'] = {
                        id: result.insertId,
                        name: name,
                        email: email,
                        provider: 'facebook',
                        email_verified_at: date
                    }
                    delete req.session['passport'];
                    req.flash('success', 'You successfully logged in via Facebook..');
                    res.redirect('/home');
                });
            }
            else if (emailExists.length > 0 && emailExists[0].provider != null) {
                let query = `SELECT * FROM users WHERE email LIKE ?`;
                conn.query(query, req.user.emails[0].value, (err, result) => {
                    if (err) throw err;
                    req.session['user'] = {
                        id: result[0].id,
                        name: result[0].name,
                        email: result[0].email,
                        provider: 'facebook',
                        email_verified_at: result[0].email_verified_at,
                        role: result[0].role
                    }
                    delete req.session['passport'];
                    req.flash('success', 'You successfully logged in via Facebook..');
                    res.redirect('/home');
                });
            }
            else {
                req.flash('danger', 'Something went wrong. Please try again..');
                res.redirect('/login');
            }
        });
    }

}