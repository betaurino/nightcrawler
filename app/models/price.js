module.exports = (sequelize, DataType) => {
  const Prices = sequelize.define('Prices', {

    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    fuelStationId: {
      type: DataType.INTEGER,
      references: {
        model: 'fuel_stations',
        key: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    },
    sellPrice: {
      type: DataType.DECIMAL(10, 3),
      allowNull: false
    },
    buyPrice: {
      type: DataType.DECIMAL(10, 3),
      allowNull: true
    },
    provider: {
      type: DataType.STRING(20),
      allowNull: true
    },
    date: {
      type: DataType.DATE,
      allowNull: true
    }

  }, {

    classMethods: {
      associate: (models) => {
        Prices.belongsTo(models.FuelStations);
      }
    },
    tableName: 'prices',
    timestamps: true,
    paranoid: true

  });

  return Prices;
};
