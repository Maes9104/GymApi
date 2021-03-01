const { Router } = require('express');
const passport = require('passport');
const router = Router();

const userService = require('./service');
const scopesValidationHandler = require('../../../utils/middleware/scopesValidationHandler');

// JWT Strategy
require('../../../utils/auth/strategies/jwt');

function userRoutes(app, store) {
    const UserService = userService(store);
    app.use('/api/user', router);

    router.post('/', 
            passport.authenticate('jwt', { session: false }),
            scopesValidationHandler(true),
            UserService.createUser);
    router.put('/:userId', 
            passport.authenticate('jwt', { session: false }), 
            scopesValidationHandler(true),
            UserService.updateUser);
    router.delete('/:userId', 
            passport.authenticate('jwt', { session: false }), 
            scopesValidationHandler(true),
            UserService.deleteUser);
    router.get('/', 
            passport.authenticate('jwt', { session: false }), 
            scopesValidationHandler(true),
            UserService.getUsers);
    router.get('/:userId',
            passport.authenticate('jwt', { session: false }),
            scopesValidationHandler(false), 
            UserService.getUser);
    router.put('/setAdmin/:userId',
            passport.authenticate('jwt', { session: false }),
            scopesValidationHandler(true),
            UserService.setAdminUser);
}


module.exports = userRoutes;