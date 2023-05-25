const router = require('express').Router();
const User = require('../models/user.model');

router.route('/:id').patch((req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  User.findByIdAndUpdate(id, { username, email, password }, { new: true })
    .then((updatedUser) => res.json(updatedUser))
    .catch((error) => res.status(400).json('Error: ' + error));
});

module.exports = router;