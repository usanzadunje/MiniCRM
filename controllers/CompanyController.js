const { query } = require('express');
const config = require('../config')

const conn = config.conn;


module.exports = {

    index: function(req, res, next) {   
        let query = `SELECT * FROM companies`;
        let i = 0;
        
        conn.query(query, (err, result) => {
            if(err) throw err;

            return res.render('home', {
                companies: result,
                i
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

        conn.query(query, (err, result) => {
            if(err) throw err;

            return res.render('companies/edit', {
                company: result[0]
            });
        });  
    },
    
    update: function(req, res, next) {   
        //edit       
    },
};
