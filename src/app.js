const express = require('express');
const productsRoutes = require('./routes/products.routes.js');
const cartsRouter = require('./routes/carts.routes.js');

const app = express();

app.use(express.json());

app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRouter);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});