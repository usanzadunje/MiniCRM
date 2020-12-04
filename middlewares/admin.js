const admin = () => {
    return (req, res, next) => {
        if (res.locals.user.role === 'admin') {
            next();
        }
        else {
            req.flash('danger', 'Only admins have permission for that action..');
            res.redirect('/home');
        }
    }
}

module.exports = admin;