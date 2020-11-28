const config = require('../config')

const conn = config.conn;

module.exports = {

    index: function(req, res, next) {   
        let query = `SELECT * FROM companies`;

        conn.query(query, (err, result) => {
            if(err) throw err;
            
            if(res.locals.user){
                return res.render('home', {
                    companies: result
                }); 
            }
            else{
                res.render('error', {
                  message: 'UNAUTHORIZED',
                  error: {
                    status: 401,
                  }
                })
            }
        });        
    },

    create: function(req, res, next) {   
        return res.render('companies/create');  
    },

    store: function(req, res, next) {   
        //STORE LOGIC  
    },

    edit: function(req, res, next) {  
        let query = `SELECT * FROM companies WHERE id = ${req.params.id} LIMIT 1`;

        conn.query(query, (err, result) => {
            if(err) throw err;

            return res.render('companies/edit', {
                company: result
            });
        });  
    },
    
    update: function(req, res, next) {   
        let query = `SELECT * FROM companies`;

        conn.query(query, (err, result) => {
            if(err) throw err;
            
            return res.render('home', {
                companies: result
            }); 
        });        
    },
}