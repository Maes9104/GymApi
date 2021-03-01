module.exports = (connection, Sequelize) => {
    const Gym = connection.define('gym', {
        gymId: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        gymName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        userCount: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
    });
    return Gym;
}