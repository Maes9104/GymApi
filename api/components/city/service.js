const controller = require('./controller');
const response = require('../../../utils/response');
const boom = require('@hapi/boom');

function cityService(injectedStore) {
    let store = injectedStore;
    const Controller = controller(store);
    
    const getCities = async (req, res, next) => {
        try{
            const cities = await Controller.getCities();
            response.success(req, res, cities, 200);
        } catch (error) {
            next(boom.boomify(error, { statusCode: 500 }));
        }
    }

    const getCity = async (req, res, next) => {
        const { params } = req;
        try {
            const city = await Controller.getCity(params.cityId);
            if (city) {
                response.success(req, res, city, 200);
            } else {
                next(boom.notFound('City not found'));
            }
        } catch (error) {
            next(boom.boomify(error, { statusCode: 500 }));
        }
    };

    const createCity = async (req, res, next) => {
        const { body: data } = req;
        try {
            const createdCity = await Controller.createCity(data);
            response.success(req, res, createdCity, 201);
        } catch (error) {
            next(boom.boomify(error, { statusCode: 500 }));
        }
    };

    const updateCity = async (req, res, next) => {
        const { params } = req;
        const { body: data } = req;

        try {
            const updatedCity = await Controller.updateCity(params.cityId, data);

            if (!updatedCity)
                next(boom.notFound('City not found'));
            else
                response.success(req, res, updatedCity, 200);

        } catch (error) {
            next(boom.boomify(error, { statusCode: 500 }));
        }
    };

    const deleteCity = async (req, res, next) => {
        const { params } = req;
        try {
            const deletedCity = await Controller.deleteCity(params.cityId);
            if (!deletedCity)
                next(boom.notFound('City not found'));
            else
                response.success(req, res, deletedCity, 201);
        } catch (error) {
            next(boom.boomify(error, { statusCode: 500 }));
        }
    };

    return {
        createCity,
        updateCity,
        deleteCity,
        getCities,
        getCity
    }
}

module.exports = cityService;