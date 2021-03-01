const express = require('express');

const config = require('../config.js');
const db = require('../store/db');

const { logErrors, errorHandler, } = require('../utils/middleware/errorHandler');

//Routes Call
const authRoutes = require('./components/auth/routes');
const cityRoutes = require('./components/city/routes');
const gymRoutes = require('./components/gym/routes');
const userRoutes = require('./components/user/routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

db.connection.sync({ force: false });

//Routes
authRoutes(app, db.users);
cityRoutes(app, db.cities);
gymRoutes(app, db.gyms);
userRoutes(app, db.users);

app.use(logErrors);
app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`Api escuchando en el puerto ${ config.port }`);
});