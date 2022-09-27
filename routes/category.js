
const express = require("express");
const router = express.Router();
const Category = require("../models/category");
// const path = require("path");

// get request for get all documents from the category collection
router.get("/", async (req, res) => {
    await Category.find()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json({ "Error": err }))
})

// get request for get some specific documents with id parameter
router.get("/:id", async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        res.status(400).json({ success: true, message: "no category" })
    } else {
        res.status(200).json(category)
    }
})

// put request for get id based documents
router.put("/:id", async (req, res) => {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color
        }).then(data => res.status(200).json({ "data": data }))
        .catch(err => res.status(400).json({ "Error": err }))
})

// post request
router.post("/", async (req, res) => {
    let category = await Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })

    category.save((err, data) => {
        if (err) {
            res.status(400).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

// delete request
router.delete("/:id", (req, res) => {
    Category.findByIdAndRemove(req.params.id)
        .then(category => {
            if (category) {
                return res.status(200).json({ success: category, message: "the category is deleted" })
            } else {
                return res.status(404).json({ success: false, message: "category not removed" })
            }
        })
        .catch(err => {
            return res.status(400).json({ success: false, message: err })
        })
})

module.exports = router;