const { all } = require('../app');
const conn = require('../config').conn

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
        let query = `INSERT INTO companies(name, email, website, logo)
                     VALUES('${req.body.name}', '${req.body.email}', '${req.body.website}', '${req.body.logo}')`;

        conn.query(query, (err, result) => {
            if(err) throw err;

            console.log(`Company added. ID: ${result.insertId}`);
            req.flash('success', 'Company successfully created..');
            res.redirect('/home');
        })
    },

    edit: function(req, res, next) {          
        let query = `SELECT * FROM companies WHERE id = ${req.params.id} LIMIT 1`;

        conn.query(query, (err, result) => {
            if(err) throw err;
            
            if(result.length === 0){
                req.flash('danger', 'BAD REQUEST. TRY AGAIN!')
                res.redirect('/home');
            }
            return res.render('companies/edit', {
                company: result[0]
            });
        });  
    },
    
    update: function(req, res, next) {  
        let query = `UPDATE companies SET 
                     name = '${req.body.name}', 
                     email = '${req.body.email}',
                     website = '${req.body.website}',
                     logo = '${req.body.logo}'
                     WHERE id = ${req.body.id}`;
        conn.query(query, (err, result) => {
            if(err) throw err;
            req.flash('success', `Company ${req.body.name} has been updated successfully..`);
            res.redirect('/home');
        });                  
    },

    delete: function(req, res, next) {  
        let query = `DELETE FROM companies WHERE id = ?`;
        conn.query(query, req.params.id, (err, result) => {
            if(err) throw err;

            req.flash('danger', `Company has been deleted successfully..`);
            res.redirect('/employees/' + req.body.company_id);
        });
    },
};
