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
      mail: {
          type: Sequelize.STRING(150),
          allowNull: false
      },
    //   gymId: {
    //       type: Sequelize.UUID,
    //       references: {
    //           model
    //       }
    //   }
    });
  
    return User;
  };