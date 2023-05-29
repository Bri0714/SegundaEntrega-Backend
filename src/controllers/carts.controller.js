const cartsModel = require('../models/carts.model.js');
const productsModel = require('../models/products.model.js');

const cartsController = {
    createCart: (req, res) => {
        const cart = cartsModel.addCart(req.body);
        res.json(cart);
    },

    getCartProducts: (req, res) => {
        const { cid } = req.params;
        const cart = cartsModel.getCartById(cid);
        if (cart) {
            const products = [];
            cart.products.forEach((product) => {
                const fullProduct = productsModel.getProductById(product.id);
                if (fullProduct) {
                    products.push({ ...fullProduct, quantity: product.quantity });
                }
            });
            res.json(products);
        } else {
            res.status(404).json({ error: 'Cart not found' });
        }
    },

    addProductToCart: (req, res) => {
        const { cid, pid } = req.params;
        const quantity = parseInt(req.body.quantity);
        const cart = cartsModel.getCartById(cid);
        const product = productsModel.getProductById(pid);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        const existingProduct = cart.products.find((p) => p.id === pid);
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ id: pid, quantity });
        }
        cartsModel.updateCart(cid, cart);
        res.json(cart);
    },

    removeProductFromCart: (req, res) => {
        const { cid, pid } = req.params;
        const quantity = parseInt(req.body.quantity);
        const cart = cartsModel.getCartById(cid);
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        const existingProductIndex = cart.products.findIndex(
            (product) => product.id === pid
        );
        if (existingProductIndex === -1) {
            return res.status(404).json({ error: 'Product not found in cart' });
        }
        const existingProduct = cart.products[existingProductIndex];
        if (existingProduct.quantity <= quantity) {
            cart.products.splice(existingProductIndex, 1);
        } else {
            existingProduct.quantity -= quantity;
        }
        cartsModel.updateCart(cid, cart);
        res.json(cart);
    },
};

module.exports = cartsController;