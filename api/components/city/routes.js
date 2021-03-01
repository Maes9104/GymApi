const { Router } = require('express');
const passport = require('passport');
const router = Router();

const cityService = require('./service');
const scopesValidationHandler = require('../../../utils/middleware/scopesValidationHandler');

// JWT Strategy
require('../../../utils/auth/strategies/jwt');

function cityRoutes(app, store) {
    const CityService = cityService(store);
    app.use('/api/city', router);

    router.post('/', 
            passport.authenticate('jwt', { session: false }),
            scopesValidationHandler(true),
            CityService.createCity);
    router.put('/:cityId', 
            passport.authenticate('jwt', { session: false }),
            scopesValidationHandler(true),
            CityService.updateCity);
    router.delete('/:cityId', 
            passport.authenticate('jwt', { session: false }),
            scopesValidationHandler(true),
            CityService.deleteCity);
    router.get('/', 
            passport.authenticate('jwt', { session: false }),
            scopesValidationHandler(false),
            CityService.getCities);
    router.get('/:cityId', 
            passport.authenticate('jwt', { session: false }),
            scopesValidationHandler(false),
            CityService.getCity);
}


module.exports = cityRoutes;