
const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const path = require("path");

router.get("/", async (req, res) => {
    const categoryList = await Category.find();
    res.json(categoryList)
})

router.get("/:id", async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        res.status(400).json({ success: true, message: "no category" })
    } else {
        res.status(200).send(category)
    }
})

router.put("/:id", async (req, res) => {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color
        }).then(data => res.send({"data": data}))
        .catch(err => res.send({"Error": err}))
})

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