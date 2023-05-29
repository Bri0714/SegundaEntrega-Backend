const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller.js');

// Ruta para obtener todos los productos
router.get('/', productsController.getProducts);

// Ruta para obtener un producto por id
router.get('/:pid', productsController.getProductById);

// Ruta para agregar un producto
router.post('/', productsController.addProduct);

// Ruta para actualizar un producto por id
router.put('/:pid', productsController.updateProduct);

// Ruta para eliminar un producto por id
router.delete('/:pid', productsController.deleteProduct);

module.exports = router;