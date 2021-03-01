const { Router } = require('express');
const passport = require('passport');
const router = Router();

const gymService = require('./service');
const scopesValidationHandler = require('../../../utils/middleware/scopesValidationHandler');

// JWT Strategy
require('../../../utils/auth/strategies/jwt');

function gymRoutes(app, store) {
    const GymService = gymService(store);
    app.use('/api/gym', router);

    router.post('/',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(true),
        GymService.createGym);
    router.put('/:gymId',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(true),
        GymService.updateGym);
    router.delete('/:gymId',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(true),
        GymService.deleteGym);
    router.get('/',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(true),
        GymService.getGyms);
    router.get('/:gymId',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(false),
        GymService.getGym);
    router.get('/city/:cityId',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(true),
        GymService.getGymsByCity);
    router.put('/subscribe/:gymId',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(false),
        GymService.gymSubscribe);
    router.get('/gymUsers/:gymId',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(true),
        GymService.getUsersByGym);
}

module.exports = gymRoutes;