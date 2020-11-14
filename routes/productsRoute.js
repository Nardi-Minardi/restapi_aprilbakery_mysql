const router = require('express').Router();
const productsController = require('../controllers/productsController');

router.get('/products', productsController.getProduct)

module.exports = router