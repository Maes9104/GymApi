module.exports = function(injectedStore){
    let store = injectedStore;

    async function createUser(data) {
        const created = await store.create(data);
        return created;
    }
    
    async function updateUser(userId, data) {
        const updated = await store.update(data, { 
             where: { userId: userId }
        });
        return updated || false;
    }

    async function deleteUser(userId) {
        await store.findOneAndUpdate({ userId }, { deleted_at: new Date() });
        const getDeleted = await this.getUser(_id);
        return getDeleted;
    }

    async function getUsers(){
        const users = await store.find( { deleted_at: null });
        return users || [];
    }

    async function getUser(userId) {
        const user = await store.findOne({ _id: userId });
        return user || false;
    }

    async function getUserByEmail(email) {
        const user = await store.findOne({ email });
        return user || false;
    }

    async function getUsersBySkills(skills) {
        const usersBySkills = await store.find({ "skills": { $in : skills } });
        return usersBySkills || [];
    }


    return {
        createUser,
        updateUser,
        deleteUser,
        getUser,
        getUsers,
        getUserByEmail,
        getUsersBySkills
    }
}