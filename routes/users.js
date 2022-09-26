
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
    await User.find()
        .then(data => {
            res.status(200).json({ data })
        })
        .catch(err => {
            res.status(400).json({ "Error": err })
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

router.get("/:user", async (req, res) => {
    const user = await User.find({ name: req.params.user }).select("-passwdHash");

    if (!user) {
        res.json({ message: 'ad' })
    }

    res.json({ user })
})

router.post("/login", async (req, res) => { 
    const user = await User.findOne({email: req.body.email});
    console.log(user);

    if(!user) {
        res.status(400).json({message: "The user doesn't exist"})
    }

    if(user && bcrypt.compareSync(req.body.passwdHash, user.passwdHash)) {
        res.status(200).json({message: "you are logged"});
    }else {
        res.status(400).json({message: "username or password wrong"});
    }

 })

module.exports = router;