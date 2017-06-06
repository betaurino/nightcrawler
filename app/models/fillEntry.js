module.exports = (sequelize, DataType) => {
  const FillEntries = sequelize.define('FillEntries', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    vehicleId: {
      type: DataType.INTEGER,
      references: {
        model: 'vehicles',
        key: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
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
    gasStation: {
      type: DataType.STRING,
      allowNull: false
    },
    quantity: {
      type: DataType.FLOAT,
      allowNull: false
    },
    total: {
      type: DataType.FLOAT,
      allowNull: false
    },
    unity: {
      type: DataType.ENUM(
        'liters',
        'gallons',
        'cylinders',
        'cubic_meters',
        'quilograms'
      ),
      allowNull: false
    }
  }, {

    classMethods: {
      associate: (models) => {
        FillEntries.belongsTo(models.Vehicles);
        FillEntries.belongsTo(models.Fuels);
      }
    },
    tableName: 'fill_entries',
    timestamps: true,
    paranoid: true
  });

  return FillEntries;
};
