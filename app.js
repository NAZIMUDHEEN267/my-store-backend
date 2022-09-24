
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const categoryRoute = require("./routes/category");
const orderRoute = require("./routes/order");
const productRoute = require("./routes/products");
const userRoute = require("./routes/user");

app.use(cors());
app.options("*", cors());

// database url
const DB_URL = process.env.MONGO_URL;
const API_URL = `${process.env.API_URL}`;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));

// routes middleware
app.use(`${API_URL}/category`, categoryRoute);
app.use(`${API_URL}/order`, orderRoute);
app.use(`${API_URL}/products`, productRoute);
app.use(`${API_URL}/user`, userRoute);

// database connection
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'cluster1'
})

// port listening
app.listen(8080, () => {
    console.log("listening");
})
