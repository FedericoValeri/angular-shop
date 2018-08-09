const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Product = require('./models/product');

const app = express();

mongoose.connect('mongodb+srv://fede:le7cxZJxbrvq9Voh@database-zizqm.mongodb.net/rick-shop?retryWrites=true', {
        useNewUrlParser: true
    })
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(() => {
        console.log('Connection failed!');
    });

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
    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description
    });
    product.save();
    res.status(201).json({
        message: 'Post added succesfully'
    });
});

app.get('/api/products', (req, res, next) => {
    Product.find()
        .then((documents) => {
            res.status(200).json({
                message: 'Products fetched succesfully!',
                products: documents
            });
        });
});

module.exports = app;