const auth = () => {
    return (req, res, next) => {
        if(res.locals.user){
            next();
        }
        else{
            req.flash('danger', 'Please log in to proceed..');
            res.redirect('/login');
        }
    }
}

module.exports = auth;