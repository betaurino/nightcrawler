const router = require('express').Router();

const User = require('../controllers/users');

router.post('/user', User.create);
router.post('/login', User.auth);

module.exports = router;
