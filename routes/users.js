
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => { 
    await User.find()
    .then(data => {
        res.status(200).json({data})
    })
    .catch(err => {
        res.status(400).json({"Error": err})
    })
})

router.post("/", async (req, res) => {
    await User({
        name: req.body.name,
        email: req.body.email,
        passwdHash: bcrypt.hashSync(req.body.passwdHash, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        apartment: req.body.apartment,
        street: req.body.street,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country
    }).save()
    .then(data => res.json(data))
    .catch(err => res.json(err))
})

router.get("/get/user/:name", (req, res) => { 
    User.find({name: req.params.name.match(/^[A-Z]{1}[a-z]{3}/) ? req.params.name : null})
    .exec((err, data) => {
        if(err) res.status(400).json({"Error": err})
        else res.status(200).json({data})
    })
 })

module.exports = router;