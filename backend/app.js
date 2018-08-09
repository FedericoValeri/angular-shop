const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, PUT, OPTIONS"
    );
    next();
});


app.post('/api/products', (req, res, next) => {
    const product = req.body;
    console.log(product);
    res.status(201).json({
        message: 'Post added succesfully'
    });
});

app.get('/api/products', (req, res, next) => {
    res.status(200).json({
        message: 'Products fetched succesfully!',
        products: products
    });
});

module.exports = app;