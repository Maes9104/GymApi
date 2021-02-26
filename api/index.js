const express = require('express');

const config = require('../config.js');
const db = require('../store/db');

const { logErrors, errorHandler, } = require('../utils/middleware/errorHandler');

//Routes Call
const userRoutes = require('./components/user/routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


db.connection.sync();

//Routes
userRoutes(app, db.user);

app.use(logErrors);
app.use(errorHandler);


app.listen(config.port, () => {
    console.log(`Api escuchando en el puerto ${ config.port }`);
});