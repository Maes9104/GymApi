const { Router } = require('express');

const userService = require('./service');

const router = Router();

function userRoutes(app, store) {
    const UserService = userService(store);
    app.use('/api/user', router);

    router.post('/', UserService.createUser);
    router.put('/:userId', UserService.updateUser);
    router.delete('/:userId', UserService.deleteUser);
    router.get('/', UserService.getUsers);
    router.get('/:userId', UserService.getUser);
}


module.exports = userRoutes;