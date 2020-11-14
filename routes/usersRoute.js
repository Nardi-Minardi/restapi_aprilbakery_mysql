const router = require('express').Router();
const usersController = require('../controllers/usersController');
const registerValidation = require('../validation/registerValidation');

router.post('/users/register', registerValidation.add, usersController.register)

router.post('/users/login', usersController.login)

router.get('/users', usersController.getUsers)

router.get('/users/:id', usersController.getUsersById)

router.put('/users/:id', usersController.updateUsers)

module.exports = router