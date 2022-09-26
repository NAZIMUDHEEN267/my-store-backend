
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const mongoose = require("mongoose");

const Products = require("../models/products");
const Categories = require("../models/category");

// This function used for post, put request
const inputObject = function () {
    return {
        name: this.body.name,
        description: this.body.description,
        richDescription: this.body.richDescription,
        image: this.body.image,
        brand: this.body.brand,
        price: this.body.price,
        category: this.body.category,
        countInStock: this.body.counterInStock,
        rating: this.body.rating,
        reviews: this.body.reviews,
        isFeatured: this.body.isFeatured
    }
}

// get request for all documents 
router.get("/", (req, res) => {
    Products.find()
        .populate("category")
        .exec((err, data) => err ? res.status(404).json({message: "Error"}) : res.status(200).json({ data }))
})

// get request for specific id
router.get("/:id", (req, res) => {
    Products.findOne({ "category": req.params.id })
        .populate("category")
        .exec((err, data) => err ? res.status(404).json({message: "Error"}) : res.status(200).json({ data }))
})

// post request
router.post("/", async (req, res) => {
    await Categories.findById(req.body.category)
    .catch(() => res.status(404).json({message: "Error"}))

    await Products(inputObject.call(req))
    .save((err, data) => err ? res.status(404).json({message: "Error"}) : res.status(200).json({ data }));
})

// put request, updating with specific id parameter
router.put("/:id", async (req, res) => {
    if(!mongoose.isValidObjectId(req.params.id)) {
        res.status(404).json({message: "Error"})
    }

    Products.findById(req.params.id)
    .catch(() => res.status(404).json({message: "Error"}))

    await Products.findByIdAndUpdate(req.params.id, inputObject.call(req))
        .then(data => res.status(200).json({ data }))
        .catch(err => res.status(404).json({message: "Error"}))
})

// delete request for remove one document
router.delete("/:id", async (req, res) => {
    await Products.findOneAndDelete(req.params.id)
    .then(data => res.status(200).json({ data }))
    .catch(() => res.status(404).json({message: "Error"}))
})

// get products count from products collection
router.get("/get/count", async (req, res) => { 
    await Categories.countDocuments((count) => count, (err, count) => {
        if(err) res.json({err})
        else res.json({count})
    })
    .clone()
    .catch(err => res.status(400).json({message: err}))
 })

// get request for specific property
router.get("/get/featured/:count", async (req, res) => {
    const count = req.params.count ? req.params.count : 0;

    await Products.find({isFeatured: true}).limit(Number(count))
    .then(data => res.status(200).json({data}))
    .catch(err => res.json({message: err}))
})

// get request for user searched property or properties
router.get("/get/featured/", async (req, res) => {
    const property = Object.keys(req.query).length ? Object.keys(req.query) : [];

    await Products.find({price: property}).limit(5)
    .then(data => res.status(200).json({data}))
    .catch(err => res.json({message: err}))
})

module.exports = router;