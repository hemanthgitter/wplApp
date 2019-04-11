require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const routes = require("./routes/index");

const cors = require("cors");
const app = express();
const router = express.Router();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(
    cors({
        origin: "http://localhost:4200",
        credentials: true
    })
);

//Routes
app.get("/", (req, res, next) => {
    res.send("Nothing to see here!");
});

app.use("/api/v1", routes(router));

app.use(function(req, res, next) {
    let err = new Error('Page not found');
    err.statusCode = 404;
    err.shouldRedirect = true;
    next(err);
});
app.use(function(err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send({'status':err.statusCode, 'message': err.message});
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Backend server listening on port " + port);
});
