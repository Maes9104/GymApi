module.exports = (connection, Sequelize) => {
    const User = connection.define('user', {
      userId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      lastname: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      email: {
          type: Sequelize.STRING(150),
          allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.STRING(20),
        allowNull: false
      }
    });
  
    return User;
  };