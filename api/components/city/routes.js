const { Router } = require('express');

const cityService = require('./service');

const router = Router();

function cityRoutes(app, store) {
    const CityService = cityService(store);
    app.use('/api/city', router);

    router.post('/', CityService.createCity);
    router.put('/:cityId', CityService.updateCity);
    router.delete('/:cityId', CityService.deleteCity);
    router.get('/', CityService.getCities);
    router.get('/:cityId', CityService.getCity);
}


module.exports = cityRoutes;