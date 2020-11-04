const express = require('express');

const router = express.Router();
const usersController = require('../controllers/users-controller');
const userMiddle = require('../middleware/user');

router
  .route('/register')
  .get(usersController.renderRegister)
  .post(usersController.register);

router
  .route('/login')
  .get(usersController.renderLogin)
  .post(usersController.login);

  router
  .route('/logout')
  .get(usersController.logout);

  router
  .route('/add')
  .get(userMiddle.isAuth, usersController.renderAdd)
  .post(userMiddle.isAuth, usersController.add)

  router
  .route('/account')
  .get(userMiddle.isAuth, usersController.renderAccount);

  router
  .route('/:id/edit')
  .get(userMiddle.isAuth, usersController.renderEdit);

  router
  .route('/:id/edit')
  .put(userMiddle.isAuth, usersController.edit);

  router
  .route('/:id')
  .delete(userMiddle.isAuth, usersController.toDelete);

  router
  .route('/item/:id')
  .get(userMiddle.isAuth, usersController.show);

module.exports = router;
