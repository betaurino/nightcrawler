module.exports = (sequelize, DataType) => {
  const FuelStations = sequelize.define('FuelStations', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    fuelId: {
      type: DataType.INTEGER,
      references: {
        model: 'fuels',
        key: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    },
    stationId: {
      type: DataType.INTEGER,
      references: {
        model: 'stations',
        key: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    }
  }, {
    classMethods: {
      associate: (models) => {
        FuelStations.belongsTo(models.Fuels);
        FuelStations.belongsTo(models.Stations);
      }
    },
    tableName: 'fuel_stations',
    timestamps: true,
    paranoid: true
  });

  return FuelStations;
};
