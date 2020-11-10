const router = require('express').Router();
const usersController = require('../controllers/usersController')

router.post('/users/register', usersController.register)

router.post('/users/login', usersController.login)

router.get('/users/info', usersController.info)

module.exports = router