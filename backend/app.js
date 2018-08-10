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
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});


app.post('/api/products', (req, res, next) => {
    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description
    });
    product.save().then(createdPost => {
        res.status(201).json({
            message: 'Post added succesfully',
            productId: createdPost._id
        });
    });
});

app.put('/api/products/:id', (req, res, next) => {
    const product = new Product({
        _id: req.body.id,
        title: req.body.title,
        price: req.body.price,
        description: req.body.description
    });
    Product.updateOne({
            _id: req.params.id
        }, product)
        .then(result => {
            res.status(200).json({
                message: "Update successful!"
            });
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

app.get('/api/products/:id', (req, res, next) => {
    Product.findById(req.params.id)
        .then(product => {
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({
                    message: "product not found!"
                });
            }
        });
});

app.delete('/api/products/:id', (req, res, next) => {
    Product.deleteOne({
        _id: req.params.id
    }).then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Product deleted!'
        });
    });
});

module.exports = app;