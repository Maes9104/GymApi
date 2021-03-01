const boom = require('@hapi/boom');

function scopesValidationHandler(requireAdminRole) {
    return (req, res, next) => {
        if (!req.user || (req.user && !req.user.role)) {
            log('misisng scopes');
            next(boom.unauthorized('Missing Scopes'));
        }
        if(requireAdminRole && req.user.role !== "Admin")
            next(boom.unauthorized('Insufficient Scopes'));
        else 
            next();
    }
}

module.exports = scopesValidationHandler;