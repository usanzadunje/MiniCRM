const conn = require('../config').conn
const bcrypt = require('bcrypt');

module.exports = {

    show: function(req, res, next) {  
        return res.render('users/show');                 
    },

    edit: function(req, res, next) {   
        return res.render('users/edit');            
    },

    update: function(req, res, next) {   
        if(req.body.password === req.body.password_confirmation){
            let query = `UPDATE users SET 
                        name = '${req.body.name}', 
                        email = '${req.body.email}',
                        password = '${bcrypt.hashSync(req.body.password, 10)}'
                        WHERE id = ${res.locals.user.id}`;
            conn.query(query, (err, result) => {
                if(err) throw err;
                let query = `SELECT * FROM users WHERE id = ${res.locals.user.id}`;

                conn.query(query, (err, user) => {
                    if(err) throw err;

                    res.locals.user = user[0];
                    req.session.user = user[0];

                    req.flash('success', 'You account has been updated successfully..');
                    res.redirect('/users/show');
                });                
            });                  
        }
        else{
            req.flash('danger', 'Your passwords do not match. Try again..');
            res.redirect('/users/edit');
        }       
    },
    
}