module.exports = function(injectedStore){
    let store = injectedStore;

    async function createGym(data) {
        const created = await store.create(data);
        return created;
    }
    
    async function updateGym(gymId, data) {
        const updated = await store.update(data, { 
             where: { gymId: gymId }
        });
        return updated || false;
    }

    async function deleteGym(gymId) {
        const getDeleted = await store.destroy({ where: { gymId: gymId }});
        return getDeleted;
    }

    async function getGyms(){
        const gyms = await store.findAll();
        return gyms || [];
    }

    async function getGym(gymId) {
        const gym = await store.findAll({ where: { gymId: gymId }});
        return gym || false;
    }

    return {
        createGym,
        updateGym,
        deleteGym,
        getGym,
        getGyms
    }
}