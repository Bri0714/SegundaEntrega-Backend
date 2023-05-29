const express = require('express');
const cartsController = require('../controllers/carts.controller.js');

const router = express.Router();

// Crear un nuevo carrito
router.post('/', cartsController.createCart);

// Agregar un producto al carrito
router.post('/:cid/products/:pid', cartsController.addProductToCart);

// Listar los productos de un carrito
router.get('/:cid/products', cartsController.getCartProducts);

module.exports = router;