const productsModel = require('../models/products.model.js');

const productsController = {
    getProducts: (req, res) => {
        const products = productsModel.getProducts();
        const { limit } = req.query;
        const limitedProducts = limit ? products.slice(0, limit) : products;
        res.json(limitedProducts);
    },

    getProductById: (req, res) => {
        const { pid } = req.params;
        const product = productsModel.getProductById(pid);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    },

    addProduct: (req, res) => {
        const product = req.body;
        const newProduct = productsModel.addProduct(product);
        res.json(newProduct);
    },

    updateProduct: (req, res) => {
        const { pid } = req.params;
        const updatedProduct = req.body;
        const result = productsModel.updateProduct(pid, updatedProduct);
        if (result) {
            res.json(updatedProduct);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    },

    deleteProduct: (req, res) => {
        const { pid } = req.params;
        const result = productsModel.deleteProduct(pid);
        if (result) {
            res.json({ message: 'Product deleted' });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    }
};

module.exports = productsController;