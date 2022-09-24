
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const Products = require("../models/products");
const multer = require("multer");

const storage = multer.diskStorage({destination: (req, file, cb) => {
    cb(null, file.filename + '-' + Date.now());
}})

const upload = multer({storage})

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"../","/index.html"));
})

router.post("/", upload.single('image'),(req, res) => {
    // console.log(req.body);
    const products = {
        name: req.body.name,
        image: {
            data: fs.readFileSync(path.join(__dirname, '../', '/uploads')),
            contentType: 'image/jpeg'
        },
        countInStock: req.body.countInStock
    }

    Products.create(products, (err, data) => {
        if(err) res.json(err);
        else res.redirect("/api/v1/category")
    })

    Products.find({}, (err, data) => { 
        if(err) {
            res.json({message: "error occurred"})
        } else {
            res.json({data})
        }
     })
})

router.delete("/", async (req, res) => { 
    await Products.findByIdAndDelete(req.query.id).then(data => {
        res.json(data)
    })
});

router.put("/", async (req, res) => {
    await Products.findByIdAndUpdate(req.query.id, {
        name: req.body.name,
        image: req.body.image,
        counterInStock: req.body.counterInStock
    }).then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    })
});

module.exports = router;