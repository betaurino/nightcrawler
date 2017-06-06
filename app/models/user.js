module.exports = (sequelize, DataType) => {
  const Users = sequelize.define('Users', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataType.STRING,
      allowNull: false
    },
    email: {
      type: DataType.STRING,
      allowNull: false
    },
    password: {
      type: DataType.STRING,
      allowNull: false
    }
  }, {

    classMethods: {
      associate: (models) => {
        Users.hasMany(models.Vehicles);
      }
    },
    tableName: 'users',
    timestamps: true,
    paranoid: true
  });

  return Users;
};
