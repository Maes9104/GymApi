const Sequelize = require('sequelize');
const config = require('../config');

const connection = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWD, {
    host: config.DB_HOST,
    port: config.DB_PORT,
    dialect: config.DB_DIALECT
});

connection.authenticate()
  .then(() => {
    console.log('Sucessfull connection to DB');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const db = {};

db.Sequelize = Sequelize;
db.connection = connection;

db.users = require('../models/users')(connection, Sequelize);
db.cities = require('../models/cities')(connection, Sequelize);
db.gyms = require('../models/gyms')(connection, Sequelize);

//Add associations
db.cities.hasMany(db.gyms);
db.gyms.belongsTo(db.cities);

db.gyms.hasMany(db.users);
db.users.belongsTo(db.gyms);

module.exports = db;
