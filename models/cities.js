module.exports = (connection, Sequelize) => {
    const City = connection.define('city', {
        cityId: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        city: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return City;
}