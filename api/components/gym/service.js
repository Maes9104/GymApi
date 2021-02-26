const controller = require('./controller');
const response = require('../../../utils/response');
const boom = require('@hapi/boom');

function gymService(injectedStore) {
    let store = injectedStore;
    const Controller = controller(store);
    
    const getGyms = async (req, res, next) => {
        try{
            const gyms = await Controller.getGyms();
            response.success(req, res, gyms, 200);
        } catch (error) {
            next(boom.boomify(error, { statusCode: 500 }));
        }
    }

    const getGym = async (req, res, next) => {
        const { params } = req;
        try {
            const gym = await Controller.getGym(params.gymId);
            if (gym) {
                response.success(req, res, gym, 200);
            } else {
                next(boom.notFound('Gym not found'));
            }
        } catch (error) {
            next(boom.boomify(error, { statusCode: 500 }));
        }
    };

    const createGym = async (req, res, next) => {
        const { body: data } = req;
        try {
            const createdGym = await Controller.createGym(data);
            response.success(req, res, createdGym, 201);
        } catch (error) {
            next(boom.boomify(error, { statusCode: 500 }));
        }
    };

    const updateGym = async (req, res, next) => {
        const { params } = req;
        const { body: data } = req;

        try {
            const updatedGym = await Controller.updateGym(params.gymId, data);

            if (!updatedGym)
                next(boom.notFound('Gym not found'));
            else
                response.success(req, res, updatedGym, 200);

        } catch (error) {
            next(boom.boomify(error, { statusCode: 500 }));
        }
    };

    const deleteGym = async (req, res, next) => {
        const { params } = req;
        try {
            const deletedGym = await Controller.deleteGym(params.gymId);
            if (!deletedGym)
                next(boom.notFound('Gym not found'));
            else
                response.success(req, res, deletedGym, 201);
        } catch (error) {
            next(boom.boomify(error, { statusCode: 500 }));
        }
    };

    return {
        createGym,
        updateGym,
        deleteGym,
        getGyms,
        getGym
    }
}

module.exports = gymService;