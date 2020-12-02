const verified = () => {
    return (req, res, next) => {
        if (res.locals.user.email_verified_at) {
            next();
        }
        else {
            req.flash('danger', 'Please verify your e-mail to proceed..');
            res.redirect('/email/verify');
        }
    }
}

module.exports = verified;