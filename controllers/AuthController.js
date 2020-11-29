const bcrypt = require('bcrypt');
const conn = require('../config').conn;
const mysql = require('mysql');

module.exports = {

    index: function(req, res, next) {
        return res.render('users/index');
    },

    login: function(req, res, next) {
        if(req.method === 'GET'){
            return res.render('auth/login');
        }
        if(req.method === 'POST'){
            let email = req.body.email;
            let password = req.body.password;

            let query = `SELECT * FROM users WHERE email LIKE ${mysql.escape(email)}`;
            conn.query(query, (err, result) => {
                if(err) throw err;
                if(result.length != 0){
                    if(bcrypt.compareSync(password, result[0].password)){
                        res.locals.user = result[0];
                        req.session.user = result[0];
                        req.flash('success', 'You have been logged in successfully!');
                        res.redirect('/home');
                    }
                    else{
                        req.flash('danger', 'Invalid password!');
                        req.flash('email', email);
                        res.redirect('/login');
                    }
                }
                else{
                    req.flash('danger', 'We do not have user with entered e-mail in our system.');
                    res.redirect('/login');
                }
            })
        }       
    },

    register: function(req, res, next) {
        if(req.method === 'GET'){
            return res.render('auth/register');;
        }
        if(req.method === 'POST'){     
            if(req.body.password === req.body.password_confirmation){
                let query = `SELECT id FROM users WHERE email LIKE ?`;
                conn.query(query, req.body.email, (err, emailExists) => {
                    if(err) throw err;
                    if(emailExists.length === 0){
                        let query = `INSERT INTO users(name, email, password) VALUES('${req.body.name}', '${req.body.email}', '${bcrypt.hashSync(req.body.password, 10)}')`;
                        conn.query(query, (err, result) => {
                            if(err) throw err;
                            console.log(`User added. ID: ${result.insertId}`);
                            req.flash('success', 'You account has been created successfully. Please log in to proceed..');
                            res.redirect('/login');
                        });
                    }
                    else{
                        req.flash('danger', 'User with that e-mail already exists..');
                        req.flash('name', req.body.name);
                        res.redirect('/register');
                    }
                });
                
            }
            else{
                req.flash('danger', 'Your passwords do not match. Try again..');
                req.flash('name', req.body.name);
                req.flash('email', req.body.email)
                res.redirect('/register');
            }
        } 
    },

    logout: function(req, res, next) {
        delete req.session['user'];
        res.redirect('/login');
    }
    
}