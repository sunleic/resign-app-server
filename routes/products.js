var express = require('express');
var router = express.Router();
const productHandler = require('../router_handler/products')

/* GET users listing. */
router.all('/list', productHandler.productList)

router.all('/details/:name', productHandler.productDetails)

module.exports = router;
