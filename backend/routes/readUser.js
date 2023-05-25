const router = require('express').Router();
const User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((error) => res.status(400).json('Error: ' + error));
});

module.exports = router;