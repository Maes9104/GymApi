const { Router } = require('express');

const gymService = require('./service');

const router = Router();

function gymRoutes(app, store) {
    const GymService = gymService(store);
    app.use('/api/gym', router);

    router.post('/', GymService.createGym);
    router.put('/:gymId', GymService.updateGym);
    router.delete('/:gymId', GymService.deleteGym);
    router.get('/', GymService.getGyms);
    router.get('/:gymId', GymService.getGym);
}


module.exports = gymRoutes;