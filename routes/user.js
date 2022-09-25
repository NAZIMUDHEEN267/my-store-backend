
const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/", async (req, res) => {
    const user = await User({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    }).save()
    .then(data => res.json(data))
    .catch(err => res.json(err))
})

module.exports = router;