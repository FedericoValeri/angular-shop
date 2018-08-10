const express = require('express');
const Product = require('../models/product');

const router = express.Router();


router.post('', (req, res, next) => {
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

router.put('/:id', (req, res, next) => {
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

router.get('', (req, res, next) => {
    Product.find()
        .then((documents) => {
            res.status(200).json({
                message: 'Products fetched succesfully!',
                products: documents
            });
        });
});

router.get('/:id', (req, res, next) => {
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

router.delete('/:id', (req, res, next) => {
    Product.deleteOne({
        _id: req.params.id
    }).then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Product deleted!'
        });
    });
});

module.exports = router;