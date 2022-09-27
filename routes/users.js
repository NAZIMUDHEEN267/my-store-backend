
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
    await User.find().select("-passwdHash")
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
        res.json({ message: 'The user does not exist' })
    }

    res.json({ user })
})

router.post("/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    const SECRET = process.env.SECRET_TOKEN;

    if (!user) {
        res.status(400).json({ message: "The user doesn't exist" })
    }

    if (user && bcrypt.compareSync(req.body.passwdHash, user.passwdHash)) {
        const token = jwt.sign({userId: user.id,}, SECRET, {expiresIn: "1w", algorithm: "HS512"});
        res.status(200).json({token: token});

    } else {
        res.status(400).json({ message: "username or password wrong" });
    }
})

module.exports = router;