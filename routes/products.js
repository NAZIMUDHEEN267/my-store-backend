
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const Products = require("../models/products");
const Categories = require("../models/category");

const FILE_TYPE_CONFIG = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg"
}

// uploading files manage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_CONFIG[file.mimetype];
        const uploadErr = (isValid) ? null : new Error("uploaded file not valid");
        cb(uploadErr, 'public/uploads');
    },
    filename: function (req, file, cb) {
        const extension = FILE_TYPE_CONFIG[file.mimetype];
        const fileName = file.originalname.replace(" ", "-");
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    }
})

const uploadOption = multer({ storage: storage });

// get request for all documents 
router.get("/", (req, res) => {
    Products.find()
        .populate("category")
        .exec((err, data) => err ? res.status(404).json({ message: "Error" }) : res.status(200).json({ data }))
})

// get request for specific id
router.get("/:id", (req, res) => {
    Products.findOne({ "category": req.params.id })
        .populate("category")
        .exec((err, data) => err ? res.status(404).json({ message: "Error" }) : res.status(200).json({ data }))
})

// get products count from products collection
router.get("/get/count", async (req, res) => {
    await Categories.countDocuments((count) => count, (err, count) => {
        if (err) res.json({ err })
        else res.json({ count })
    })
        .clone()
        .catch(err => res.status(400).json({ message: err }))
})

// get request for specific property
router.get("/get/featured/:count", async (req, res) => {
    const count = req.params.count ? req.params.count : 0;

    await Products.find({ isFeatured: true }).limit(Number(count))
        .then(data => res.status(200).json({ data }))
        .catch(err => res.json({ message: err }))
})

// get request for user searched property or properties
router.get("/get/featured/", async (req, res) => {
    const property = Object.keys(req.query).length ? Object.keys(req.query) : [];

    await Products.find({ price: property }).limit(5)
        .then(data => res.status(200).json({ data }))
        .catch(err => res.json({ message: err }))
})

// post request
router.post("/", uploadOption.single('image'), async (req, res) => {
    await Categories.findById(req.body.category)
        .catch(() => res.status(404).json({ message: "Error's category" }))

        if(!req.file) {
            res.status(400).json({"Error": "No file uploaded"})
        }

        // executing fileName
        const fileName = req.file.filename;
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;


        await Products({
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: `${basePath}${fileName}`,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            reviews: req.body.reviews,
            isFeatured: req.body.isFeatured
        })
        .save().then(() => {
            res.status(200).json({success: "saved to db"})
        }).catch(() => {
            res.status(400).json({Error: "not saved to db"})
        })
})

// put request, updating with specific id parameter
router.put("/:id", async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(404).json({ message: "Error" })
    }

    Products.findById(req.params.id)
        .catch(() => res.status(404).json({ message: "Error" }))

    await Products.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        reviews: req.body.reviews,
        isFeatured: req.body.isFeatured
    }).save()
        .then(data => res.status(200).json({ data }))
        .catch(err => res.status(404).json({ message: "Error" }))
})

// delete request for remove one document
router.delete("/:id", async (req, res) => {
    await Products.findOneAndDelete(req.params.id)
        .then(data => res.status(200).json({ data }))
        .catch(() => res.status(404).json({ message: "Error" }))
})


module.exports = router;