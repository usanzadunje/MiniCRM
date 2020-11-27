const config = require('../config')

module.exports = {

    index: function(req, res, next) {   
        let query = `SELECT * FROM users`;

        config.conn.query(query, (err, result) => {
            if(err) throw err;
            
            return res.render('users/index', {
                users: result
            }); 
        });        
    },
    
}