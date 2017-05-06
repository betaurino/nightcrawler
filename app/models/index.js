const fs = require('fs');
const path = require('path');
const config = require('config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password, {

    host: config.db.host,
    dialect: config.db.sgbd,
    port: config.db.port,
    logging: false
  }
);

const db = {
  sequelize,
  Sequelize,
  models: {}
};

  // read all models and add them to "db" object and sequelize module
fs.readdirSync(__dirname).forEach((file) => {
  const modelDir = path.join(__dirname, file);
  const model = sequelize.import(modelDir);
  db.models[model.name] = model;
});

Object.keys(db.models).forEach((key) => {
  db.models[key].associate(db.models);
});

module.exports = db;
