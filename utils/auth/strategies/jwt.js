const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const config = require('../../../config');
const userService = require('../../../api/components/user/service');
const db = require('../../../store/db');

const UserService = userService(db.users);

passport.use(
    new Strategy({
        secretOrKey: config.AUTH_JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
        async (tokenPayload, cb) => {
            try {
                const user = await UserService.verifyUser(tokenPayload.email);
                if (!user) {
                    return cb("Unauthorized", false);
                }
                delete user.password;
                return cb(null, { ...user, role: tokenPayload.role });
            } catch (error) {
                return cb(error);
            }
        })
);