const response = require('../../../utils/response');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../../../config');


const userController = require('../user/controller');

const boom = require('@hapi/boom');

//Basic Strategy
require('../../../utils/auth/strategies/basic');

function authService(injectedStore) {
    let store = injectedStore;
    const DEFAULT_PROFILE = 'defaultUser';

    const signIn = async (req, res, next) => {

        passport.authenticate('basic', function (error, user) {
            try {
                if (error || !user)
                    next(boom.unauthorized('Authenticate Process Failed'));

                req.login(user, { session: false }, async (error) => {
                    if (error)
                        next(error);

                    const { userId: id, name, email, role } = user;
                    const payload = {
                        sub: id,
                        name,
                        email,
                        role
                    };

                    const token = jwt.sign(payload, config.AUTH_JWT_SECRET, {
                        expiresIn: '60m'
                    });

                    response.success(req, res, { token, user: user }, 200);
                });
            } catch (error) {
                next(error)
            }
        })(req, res, next);
    };

    const signUp = async (req, res, next) => {
        const UserController = userController(store);
        const user = req.body;
        try {
            const findUser = await UserController.getUserByEmail(user.email);
            if (findUser)
                next(boom.unauthorized('Email already exists'));
            else {
                //assign default profile
                if (!user.role)
                    user.role = DEFAULT_PROFILE;

                user.password = await bcrypt.hash(user.password, 12);
                const createdUser = await UserController.createUser(user);
                response.success(req, res, createdUser, 201);

            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    return {
        signIn,
        signUp
    }
}

module.exports = authService;