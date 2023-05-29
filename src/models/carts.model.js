const fs = require('fs');
const path = require('path');

const cartFilePath = path.join(__dirname, '../data/carrito.json');

const cartsModel = {
    getCarts: () => {
        let cartData = [];
        try {
            cartData = fs.readFileSync(cartFilePath, 'utf-8');
            cartData = JSON.parse(cartData);
        } catch (error) {
            console.error('Error parsing cart data: ', error);
        }
        if (!Array.isArray(cartData)) {
            cartData = [];
        }
        return cartData;
    },

    getCartById: (id) => {
        const carts = cartsModel.getCarts();
        return carts.find((cart) => cart.id === id);
    },

    addCart: (cart) => {
        const carts = cartsModel.getCarts();
        const newCart = { ...cart, id: Date.now().toString(), products: [] };
        carts.push(newCart);
        fs.writeFileSync(cartFilePath, JSON.stringify(carts, null, 2));
        return newCart;
    },

    updateCart: (id, updatedCart) => {
        const carts = cartsModel.getCarts();
        const cartIndex = carts.findIndex((cart) => cart.id === id);
        if (cartIndex === -1) return null;
        carts[cartIndex] = updatedCart;
        fs.writeFileSync(cartFilePath, JSON.stringify(carts, null, 2));
        return updatedCart;
    },

    addProductToCart: (cartId, productId, quantity) => {
        const carts = cartsModel.getCarts();
        const cartIndex = carts.findIndex((cart) => cart.id === cartId);
        if (cartIndex === -1) return null;

        const existingProductIndex = carts[cartIndex].products.findIndex(
            (product) => product.id === productId
        );

        if (existingProductIndex === -1) {
            carts[cartIndex].products.push({ id: productId, quantity });
        } else {
            carts[cartIndex].products[existingProductIndex].quantity += quantity;
        }

        cartsModel.updateCart(cartId, carts[cartIndex]);

        return carts[cartIndex];
    },

    removeProductFromCart: (cartId, productId, quantity) => {
        const carts = cartsModel.getCarts();
        const cartIndex = carts.findIndex((cart) => cart.id === cartId);
        if (cartIndex === -1) return null;

        const existingProductIndex = carts[cartIndex].products.findIndex(
            (product) => product.id === productId
        );

        if (existingProductIndex === -1) return null;

        const existingProduct = carts[cartIndex].products[existingProductIndex];

        if (existingProduct.quantity <= quantity) {
            carts[cartIndex].products.splice(existingProductIndex, 1);
        } else {
            existingProduct.quantity -= quantity;
        }

        cartsModel.updateCart(cartId, carts[cartIndex]);

        return carts[cartIndex];
    },
};

module.exports = cartsModel;