
module.exports = (sequelize, DataType) => {
  const Fuels = sequelize.define('Fuels', {

    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: false,
      allowNull: false
    },
    description: {
      type: DataType.STRING,
      allowNull: false
    }

  }, {

    classMethods: {
      associate: (models) => {
        Fuels.hasMany(models.FillEntries);
        Fuels.hasMany(models.FuelStations);
      }
    },
    tableName: 'fuels',
    timestamps: true,
    paranoid: true
  });

  return Fuels;
};
