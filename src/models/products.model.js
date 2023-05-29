const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/products.json');

const getProducts = () => {
    if (!fs.existsSync(filePath) || fs.readFileSync(filePath, 'utf-8').trim() === '') {
        return [];
    }
    const products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return products;
};

const getProductById = (id) => {
    const products = getProducts();
    const product = products.find((p) => p.id == id);
    return product;
};

const addProduct = (product) => {
    const products = getProducts();
    const lastId = products.length > 0 ? products[products.length - 1].id : 0;
    const newProduct = { id: lastId + 1, ...product };
    products.push(newProduct);
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
    return newProduct;
};

const updateProduct = (id, updatedProduct) => {
    const products = getProducts();
    const index = products.findIndex((p) => p.id == id);
    if (index !== -1) {
        const updatedProductWithId = { ...updatedProduct, id: parseInt(id) };
        products[index] = updatedProductWithId;
        fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
        return true;
    }
    return false;
};

const deleteProduct = (id) => {
    const products = getProducts();
    const index = products.findIndex((p) => p.id == id);
    if (index !== -1) {
        products.splice(index, 1);
        fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
        return true;
    }
    return false;
};

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
};