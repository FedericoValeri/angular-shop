const express = require('express');

const app = express();

app.use('/api/products', (req, res, next) => {
    const products = [{
        id: 'dsfsdgsbg',
        title: 'First product',
        price: 100,
        description: 'toro loco is the best pizza ever'
    }];
    res.status(200).json({
        message: 'Products fetched succesfully!',
        products: products
    });
});

module.exports = app;