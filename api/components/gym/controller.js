const { cities, users } = require("../../../store/db");

module.exports = function (injectedStore) {
    let store = injectedStore;

    async function createGym(data) {
        const city = await cities.findOne({ where: { cityId: data.cityId } });
        if (!city) {
            throw new Error("The selected city doesn't exists please try again");
        }
        const createdGym = await store.create(data);
        createdGym.setCity(city);
        return createdGym;
    }

    async function updateGym(gymId, data) {
        const updated = await store.update(data, {
            where: { gymId: gymId }
        });
        return updated || false;
    }

    async function deleteGym(gymId) {
        const getDeleted = await store.destroy({ where: { gymId: gymId } });
        return getDeleted;
    }

    async function getGyms() {
        try {
            const gyms = await store.findAll({
                include: [{
                    model: cities,
                    as: 'city'
                }]
            });
            return gyms || [];

        } catch (error) {
            console.log(error);
        }
    }

    async function getGym(gymId) {
        const gym = await store.findOne({ where: { gymId: gymId }});
        return gym || false;
    }

    async function getGymsByCity(cityId) {
        const gyms = await store.findAll({ where: { cityId: cityId }, include: ["users"] });
        return gyms || [];
    }

    async function gymSubscribe(userId, gymId){
        const user = await users.findOne({ where: { userId: userId }});
        const gym = await getGym(gymId);
        if(gym.userCount >= 300)
            throw new error('This gym is full, please subscribe to another');
        
        user.setGym(gym);
        gym.userCount = gym.userCount + 1;
        gym.save();
        return gym || false;
    }

    async function getUsersByGym(gymId) {
        const userGyms = await store.findAll({ where: { gymId: gymId }, include: ["users"]});
        return userGyms || [];
    }

    return {
        createGym,
        updateGym,
        deleteGym,
        getGym,
        getGyms,
        getGymsByCity,
        gymSubscribe,
        getUsersByGym
    }
}