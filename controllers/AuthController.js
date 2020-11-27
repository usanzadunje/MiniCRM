const bcrypt = require('bcrypt');

module.exports = {

    index: function(req, res, next) {
        return res.render('users/index');
    },

    login: function(req, res, next) {
        if(req.method === 'GET'){
            return res.render('auth/login');;
        }
        if(req.method === 'POST'){
            let email = req.body.email;
            let password = req.body.password;

            let query = `SELECT * FROM users WHERE email LIKE ${mysql.escape(email)}`;
            conn.query(query, (err, result) => {
                if(err) throw err;
                if(result.length != 0){
                    res.send(result[0].password === password);
                }
                else{
                    res.send('NONE')
                }
            })
        }       
    },

    register: function(req, res, next) {
        if(req.method === 'GET'){
            return res.render('auth/register');;
        }
        if(req.method === 'POST'){
            let email = req.body.email;
            let password = req.body.password;

            let query = `SELECT * FROM users WHERE email LIKE ${mysql.escape(email)}`;
            conn.query(query, (err, result) => {
                if(err) throw err;
                if(result.length != 0){
                    res.send(result[0].password === password);
                }
                else{
                    res.send('NONE')
                }
            })
        } 
    }
    
}