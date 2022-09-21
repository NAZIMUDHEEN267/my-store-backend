
const express = require("express");
const router = express.Router();
const path = require("path");
const Products = require("../models/products");

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../", "/index.html"));
})

router.post("/", (req, res) => {
    const products = new Products({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    })

    products.save((err, data) => {
        if (err) console.log(err);
        else res.status(200).json({ data })
    })
})

module.exports = router;