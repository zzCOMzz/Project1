const express = require('express');
// const router  = express.Router();
const router = require('express-promise-router')()

const UserControllers = require('../controllers/users')
const { validateParam , schemas}   = require('../helpers/routeHelpers')


router.route('/')
  .get(UserControllers.index)
  .post(UserControllers.newUser);

// /users/:id
router.route('/:userId')
  .get(validateParam(schemas.idSchema, 'userId'), UserControllers.getUser)
  .put(UserControllers.replaceUser)
  .patch(UserControllers.updateUser)

router.route('/:userId/cars')
  .get(UserControllers.getUserCars)
  .post(UserControllers.newUserCars)

router.route('/about')
  .get(UserControllers.about);
module.exports = router;