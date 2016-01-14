var express = require('express');
var router = express.Router();

var Product = require('../models/product');

Product.methods(['get', 'post', 'put', 'delete']);
Product.register(router, '/products');

module.exports = router;