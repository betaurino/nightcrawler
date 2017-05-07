
module.exports = (sequelize, DataType) => {
  const Cities = sequelize.define('Cities', {

    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: false,
      allowNull: false
    },
    name: {
      type: DataType.STRING,
      allowNull: false
    },
    anpName: {
      type: DataType.STRING,
      allowNull: false
    }

  }, {

    classMethods: {
      associate: (models) => {
        Cities.hasMany(models.Stations);
        Cities.hasMany(models.Statistics);
        Cities.belongsTo(models.States);
      }
    },
    tableName: 'cities',
    timestamps: true,
    paranoid: true
  });

  return Cities;
};
