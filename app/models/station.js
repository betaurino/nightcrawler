module.exports = (sequelize, DataType) => {
  const Stations = sequelize.define('Stations', {

    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    cityId: {
      type: DataType.INTEGER,
      references: {
        model: 'cities',
        key: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    },
    name: {
      type: DataType.STRING,
      allowNull: false
    },
    address: {
      type: DataType.STRING,
      allowNull: false
    },
    latitude: {
      type: DataType.FLOAT,
      allowNull: false
    },
    longitude: {
      type: DataType.FLOAT,
      allowNull: false
    },
    area: {
      type: DataType.STRING,
      allowNull: false
    },
    flag: {
      type: DataType.STRING,
      allowNull: true
    }

  }, {

    classMethods: {
      associate: (models) => {
        Stations.hasMany(models.Prices);
        Stations.hasMany(models.FuelStations);
        Stations.belongsTo(models.Cities);
      }
    },
    tableName: 'stations',
    timestamps: true,
    paranoid: true
  });

  return Stations;
};
