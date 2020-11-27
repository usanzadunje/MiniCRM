const config = require('../config')

module.exports = {

    index: function(req, res, next) {   
        let query = `SELECT * FROM companies`;

        config.conn.query(query, (err, result) => {
            if(err) throw err;
            
            return res.render('home', {
                companies: result
            }); 
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

        config.conn.query(query, (err, result) => {
            if(err) throw err;

            return res.render('companies/edit', {
                company: result
            });
        });  
    },
    
    update: function(req, res, next) {   
        let query = `SELECT * FROM companies`;

        config.conn.query(query, (err, result) => {
            if(err) throw err;
            
            return res.render('home', {
                companies: result
            }); 
        });        
    },
}