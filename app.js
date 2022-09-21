
const express = require("express");
const app = express();
const fs = require('fs');
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("tiny"));

// api url
const API = process.env.API_URL;
const DB_URL = process.env.MONGO_URL;

const products = {
    id: 1, 
    name: 'grocery',
    img: "url"
}

app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname, "/index.html"))
 })

app.post("/", (req, res) => { 
    console.log(req.body);
    res.end();
})

// database connection
mongoose.connect(DB_URL)
.then(data => {
    console.log(data.Query);
}).catch(err => {
    console.log(err);
}) 

 app.listen(8080, () => { 
    console.log("listening");
  })
