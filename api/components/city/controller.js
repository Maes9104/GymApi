const db = require("../../../store/db");

module.exports = function(injectedStore){
    let store = injectedStore;

    async function createCity(data) {
        const created = await store.create(data);
        return created;
    }
    
    async function updateCity(cityId, data) {
        const updated = await store.update(data, { 
             where: { cityId: cityId }
        });
        return updated || false;
    }

    async function deleteCity(cityId) {
        const getDeleted = await store.destroy({ where: { cityId: cityId }});
        return getDeleted;
    }

    async function getCities(){
        const cities = await store.findAll({ include: ["gyms"]});
        return cities || [];
    }

    async function getCity(cityId) {
        const city = await store.findAll({ 
            where: { cityId: cityId }, 
            include: [{
                model: db.gyms,
                as: "Gym"
            }]
        });
        return city || false;
    }

    return {
        createCity,
        updateCity,
        deleteCity,
        getCity,
        getCities
    }
}