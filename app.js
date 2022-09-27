
const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const expressJwt = require("../backend/helpers/jwt");
const errHandler = require("./helpers/error-handler");

const categoryRoute = require("./routes/category");
const orderRoute = require("./routes/orders");
const productRoute = require("./routes/products");
const userRoute = require("./routes/users");

app.use(cors());
app.options("*", cors());
app.use(expressJwt());

// database url
const DB_URL = process.env.MONGO_URL;
const API_URL = `${process.env.API_URL}`;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));

// routes middleware
app.use(`${API_URL}/categories`, categoryRoute);
app.use(`${API_URL}/orders`, orderRoute);
app.use(`${API_URL}/products`, productRoute);
app.use(`${API_URL}/users`, userRoute);

// database connection
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'cluster1'
})

// Error handle middle ware
app.use(errHandler);

// port listening
app.listen(8080, () => {
    console.log("listening");
})
