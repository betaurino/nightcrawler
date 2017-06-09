const db = require('../models');

const Users = db.models.Users;

exports.create = (req, res) => {
  const user = req.body;

  Users.create(user)
    .then(newUser => res.json(newUser))
    .catch(err => res.status(412).json(err));
};

// Very simple authentication
exports.auth = (req, res) => {
  Users.findOne({
    where: {
      email: req.body.email,
      password: req.body.password
    }
  })
  .then((user) => {
    if (!user) {
      return res.status(404).json({
        error: 404,
        message: 'user_not_found'
      });
    }

    return res.json(user);
  })
  .catch(err => res.status(412).json(err));
};
