const auth = () => {
    return (req, res, next) => {
        if(res.locals.user){
            next();
        }
        else{
            res.render('error', {
                message: 'UNAUTHORIZED',
                error: {
                status: 401,
                }
            });
        }
    }
}

module.exports = auth;