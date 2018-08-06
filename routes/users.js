const express = require('express');
const router  = express.Router();

const UserControllers = require('../controllers/users')

router.route('/')
  .get(UserControllers.index)
  .post(UserControllers.newUser)

router.route('/about')
  .get(UserControllers.about)
module.exports = router;