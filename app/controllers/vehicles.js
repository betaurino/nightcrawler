const db = require('../models');

const Vehicles = db.models.Vehicles;

exports.create = (req, res) => {
  const vehicle = req.body;

  Vehicles.create(vehicle)
    .then(newV => res.json({
      status: 200,
      data: newV
    }))
    .catch(err => res.status(412).json(err));
};

exports.findByUser = (req, res) => {
  const userId = res.params.userId;

  Vehicles.findAll({ where: { userId } })
    .then(vehicles => res.json({
      status: 200,
      data: vehicles
    }))
    .catch(err => res.status(412).json(err));
};

exports.delete = (req, res) => {
  Vehicles.destroy({
    where: { id: req.params.id }
  })
  .then(() => res.json({
    status: 200
  }))
  .catch(err => res.status(412).json(err));
};
