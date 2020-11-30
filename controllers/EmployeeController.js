const conn = require('../config').conn;
var createError = require('http-errors');

module.exports = {

    index: function(req, res, next) {   
        let query = `SELECT * FROM employees WHERE company_id = ?`;
        let queryCompany = `SELECT * FROM companies WHERE id = ${req.params.companyId}`;
        let i = 0;
        
        conn.query(query, req.params.companyId, (err, result) => {
            if(err) throw err;

            conn.query(queryCompany, (err, result1) =>{
                if(err) throw err;

                if(result1.length === 0){
                    req.flash('danger', 'BAD REQUEST. TRY AGAIN!')
                    res.redirect('/home');
                }
                return res.render('employees/index', {
                    employees: result,
                    company: result1[0],
                    i
                });
            });
            
        });  
          
    },

    show: function(req, res, next) {  
        let query = 'SELECT * FROM employees WHERE id = ?'
        conn.query(query, req.params.id, (err, result) => {
            if(err) throw err;

            if(result.length === 0){
                req.flash('danger', 'BAD REQUEST. TRY AGAIN!')
                res.redirect('/home');
            }
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
        let query = `SELECT id FROM employees WHERE email LIKE ?`;
        conn.query(query, req.body.email, (err, emailExists) => {
            if(err) throw err;
            if(emailExists.length === 0){
                let queryInsert = `INSERT INTO employees(fname, lname, email, phone, company_id) 
                            VALUES('${req.body.fname}', '${req.body.lname}', '${req.body.email}', ${req.body.phone}, ${req.body.company_id})`;
                conn.query(queryInsert, (err, result) => {
                if(err) throw err;

                console.log(`Employee added. ID: ${result.insertId}`);
                req.flash('success', 'Employee successfully created..');
                res.redirect('/employees/' + req.body.company_id);
                });
            }
            else{
                req.flash('danger', 'User with that e-mail already exists..');
                req.flash('fname', req.body.fname);
                req.flash('lname', req.body.lname);
                req.flash('phone', req.body.phone);
                res.redirect('back');
            }
        });
    },

    edit: function(req, res, next) {  
        let query = `SELECT * FROM employees WHERE id = ${req.params.id} LIMIT 1`;

        conn.query(query, (err, result) => {
            if(err) throw err;

            if(result.length === 0){
                req.flash('danger', 'BAD REQUEST. TRY AGAIN!')
                res.redirect('/home');
            }
            return res.render('employees/edit', {
                employee: result[0]
            });
        });  
    },
    
    update: function(req, res, next) {   
        let query = `UPDATE employees SET 
                     fname =  '${req.body.fname}', 
                     lname =  '${req.body.lname}', 
                     email = '${req.body.email}',
                     phone = '${req.body.phone}'
                     WHERE id = ${req.body.id}`;
        conn.query(query, (err, result) => {
            if(err) throw err;

            req.flash('success', `Employee ${req.body.fname} ${req.body.lname} has been updated successfully..`);
            res.redirect('/employee/show/' + req.body.id);
        }); 
    },

    delete: function(req, res, next) {   
        let query = `DELETE FROM employees WHERE id = ?`;
        conn.query(query, req.params.id, (err, result) => {
            if(err) throw err;

            req.flash('danger', `Employee has been deleted successfully..`);
            res.redirect('/home');
        });
    },
};
