module.exports = (sequelize, DataType) => {
  const Vehicles = sequelize.define('Vehicles', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    userId: {
      type: DataType.INTEGER,
      references: {
        model: 'users',
        key: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    },
    model: {
      type: DataType.STRING,
      allowNull: false
    },
    mark: {
      type: DataType.STRING,
      allowNull: false
    },
    plate: {
      type: DataType.STRING,
      allowNull: false
    }
  }, {

    classMethods: {
      associate: (models) => {
        Vehicles.belongsTo(models.Users);
      }
    },
    tableName: 'vehicles',
    timestamps: true,
    paranoid: true
  });

  return Vehicles;
};
