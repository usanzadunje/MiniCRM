const conn = require('../config').conn;
const path = require('path');
const fs = require('fs');

module.exports = {

    index: function (req, res, next) {
        let query = `SELECT * FROM companies`;
        let i = 0;

        conn.query(query, (err, result) => {
            if (err) throw err;

            return res.render('home', {
                companies: result,
                i
            });
        });

    },

    create: function (req, res, next) {
        return res.render('companies/create');
    },

    store: function (req, res, next) {
        let logoName = '';
        let logo = null;

        if (req.files) {
            logo = req.files.photo;
            logoName = Date.now() + '_' + logo.name;
        }
        else {
            logoName = 'noimage.jpg';
        }
        let query = `INSERT INTO companies(name, email, website, logo)
                     VALUES('${req.body.name}', '${req.body.email}', '${req.body.website}', '${logoName}')`;

        conn.query(query, (err, result) => {
            if (err) throw err;
            if (logoName !== 'noimage.jpg') {
                logo.mv(path.join(__dirname, '../public/images/' + logoName), function (err) {
                    if (err) {
                        req.flash('danger', 'Something went wrong with uploading your image.')
                        return res.redirect(500, 'home');
                    }
                });
            }

            console.log(`Company added. ID: ${result.insertId}`);
            req.flash('success', 'Company successfully created..');
            res.redirect('/home');
        });
    },

    edit: function (req, res, next) {
        let query = `SELECT * FROM companies WHERE id = ${req.params.id}`;

        conn.query(query, (err, result) => {
            if (err) throw err;

            if (result.length === 0) {
                req.flash('danger', 'BAD REQUEST. TRY AGAIN!')
                res.redirect('/home');
            }
            return res.render('companies/edit', {
                company: result[0]
            });
        });
    },

    update: function (req, res, next) {
        let logoName = '';
        let logo = null;
        let querySelect = `SELECT * FROM companies WHERE id = ?`

        conn.query(querySelect, req.params.id, (err, result) => {
            if (err) throw err;

            if (req.files) {
                logo = req.files.photo;
                logoName = Date.now() + '_' + logo.name;
            }
            else {
                logoName = result[0].logo;
            }

            let queryUpdate = `UPDATE companies SET 
                     name = '${req.body.name}', 
                     email = '${req.body.email}',
                     website = '${req.body.website}',
                     logo = '${logoName}'
                     WHERE id = ${req.params.id}`;
            conn.query(queryUpdate, (err, result1) => {
                if (err) throw err;

                if (logoName !== result[0].logo) {
                    if (result[0].logo !== 'noimage.jpg') {
                        fs.unlinkSync(path.join(__dirname, '../public/images/' + result[0].logo));
                    }
                    logo.mv(path.join(__dirname, '../public/images/' + logoName), function (err) {
                        if (err) {
                            req.flash('danger', 'Something went wrong with uploading your image.')
                            return res.redirect(500, 'home');
                        }
                    });
                }

                req.flash('success', `Company ${req.body.name} has been updated successfully..`);
                res.redirect('/home');
            });

        });




    },

    delete: function (req, res, next) {
        let queryDelete = `DELETE FROM companies WHERE id = ?`;
        let querySelect = `SELECT * FROM companies WHERE id = ?`;

        conn.query(querySelect, req.params.id, (err, result) => {
            if (err) throw err;

            if (result[0].logo !== 'noimage.jpg') {
                fs.unlinkSync(path.join(__dirname, '../public/images/' + result[0].logo))
            }

            conn.query(queryDelete, req.params.id, (err, result1) => {
                if (err) throw err;

                req.flash('success', `Company has been deleted successfully..`);
                res.redirect('/home');
            });
        });
    },
};
