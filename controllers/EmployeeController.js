const { query } = require('express');
const config = require('../config')

const conn = config.conn;


module.exports = {

    index: function(req, res, next) {   
        let query = `SELECT * FROM employees WHERE company_id = ?`;
        let i = 0;
        
        conn.query(query, req.params.companyId, (err, result) => {
            if(err) throw err;

            return res.render('employees/index', {
                employees: result,
                i
            });
        });  
          
    },

    show: function(req, res, next) {  
        let query = 'SELECT * FROM employees WHERE id = ?'
        conn.query(query, req.params.id, (err, result) => {
            if(err) throw err;

            return res.render('employees/show', {
                employee: result[0],
            });  
        })
    },

    create: function(req, res, next) {   
        return res.render('employees/create', {
            companyId: req.params.companyId,
        });
    },

    store: function(req, res, next) {   
        //STORE LOGIC  
    },

    edit: function(req, res, next) {  
        let query = `SELECT * FROM employees WHERE id = ${req.params.id} LIMIT 1`;

        conn.query(query, (err, result) => {
            if(err) throw err;

            return res.render('employees/edit', {
                employee: result[0]
            });
        });  
    },
    
    update: function(req, res, next) {   
        //update       
    },
};
