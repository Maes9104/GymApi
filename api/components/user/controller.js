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
        const getDeleted = await store.destroy({ where: { userId: userId }});
        return getDeleted;
    }

    async function getUsers(){
        const users = await store.findAll();
        return users || [];
    }

    async function getUser(userId) {
        const user = await store.findAll({ where: { userId: userId }});
        return user !== [] ? user : false;
    }

    async function getUserByEmail(email) {
        const user = await store.findOne({ where: { email: email }});
        return user;
    }

    async function setAdminUser(userId){
        const user = await getUser(userId);
        user.role = 'Admin';
        user.save();
        return user;
    }

    return {
        createUser,
        updateUser,
        deleteUser,
        getUser,
        getUsers,
        getUserByEmail,
        setAdminUser
    }
}