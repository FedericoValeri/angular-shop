const express = require("express");
const multer = require("multer");

const Product = require("../models/product");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(error, "backend/images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname
            .toLowerCase()
            .split(" ")
            .join("-");
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + "-" + Date.now() + "." + ext);
    }
});

router.post("", checkAuth, multer({
    storage: storage
}).single("image"), (req, res, next) => {
    const url = req.protocol + '://' + req.get("host");
    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        imagePath: url + "/images/" + req.file.filename
    });
    product.save().then(createdPost => {
            res.status(201).json({
                message: 'Post added succesfully',
                product: {
                    ...createdPost,
                    id: createdPost._id
                }
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Creating a post failed'
            });
        });
});

router.put("/:id", checkAuth, multer({
    storage: storage
}).single("image"), (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
        const url = req.protocol + '://' + req.get("host");
        imagePath = url + "/images/" + req.file.filename;
    }
    const product = new Product({
        _id: req.body.id,
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        imagePath: imagePath
    });
    Product.updateOne({
            _id: req.params.id
        }, product)
        .then(result => {
            res.status(200).json({
                message: "Update successful!"
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Unable to update product!'
            });
        });
});

router.get("", (req, res, next) => {
    Product.find()
        .then((documents) => {
            res.status(200).json({
                message: 'Products fetched succesfully!',
                products: documents
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Fetching products failed!'
            });
        });
});

router.get("/:id", (req, res, next) => {
    Product.findById(req.params.id)
        .then(product => {
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({
                    message: "Product not found!"
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Fetching product failed!'
            });
        });;
});

router.delete("/:id", checkAuth, (req, res, next) => {
    Product.deleteOne({
            _id: req.params.id
        }).then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Product deleted!'
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Deleting product failed!'
            });
        });;
});

module.exports = router;