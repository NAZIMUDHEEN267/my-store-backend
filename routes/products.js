
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const Products = require("../models/products");
const Category = require("../models/category");
const User = require("../models/user");
const { default: mongoose } = require("mongoose");

// router.get("/", async (req, res) => {
//     await Products.find()
//     .then(data => {
//         res.json(data);
//     }).catch(err => {
//         res.json(err);
//     })
// })

router.get("/:id", async (req, res) => {
    await Products.findById(req.params.id).populate("category")
    .then(data => res.json(data))
    .catch(err => res.catch(err))
})

router.post("/", async (req, res) => {
    const categoryValid = mongoose.Types.ObjectId.isValid(req.query.category);
    const userValid = mongoose.Types.ObjectId.isValid(req.query.user);

    console.log("categoryBody: " + req.body.category, "userBody: " + req.body.user);
    console.log("categoryValid: " + categoryValid, "userValid: " + userValid);

    const products = await Products({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.counterInStock,
        rating: req.body.rating,
        reviews: req.body.reviews,
        isFeatured: req.body.isFeatured,
        user: req.body.user
    });

    products.save((err, data) => {
        if (err) res.status(400).send(err)
        else res.status(200).send(data)
    })
})

module.exports = router;