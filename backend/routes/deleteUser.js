const router = require('express').Router();
const User = require('../models/user.model');

router.route('/:id').delete((req, res) => {
  const { id } = req.params;

  User.findByIdAndDelete(id)
    .then(() => res.json('User deleted successfully'))
    .catch((error) => res.status(400).json('Error: ' + error));
});

module.exports = router;