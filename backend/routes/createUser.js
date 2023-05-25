const router = require('express').Router();
const User = require('../models/user.model');

router.route('/').post((req, res) => {
  const { username, email, password } = req.body;

  const newUser = new User({
    username,
    email,
    password,
  });

  newUser
    .save()
    .then(() => res.json(newUser))
    .catch((error) => res.status(400).json('Error: ' + error));
});

module.exports = router;