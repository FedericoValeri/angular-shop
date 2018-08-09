const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Header",
        "Origin, X-Requested-Width, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, PUT, OPTIONS"
    );
});

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