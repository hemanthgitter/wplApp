require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();

//DB config
const mongoURI = process.env.MONGO_LOCAL_CONN_URL;

//Connect to mongoDB mlab
mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(() => {
        console.log("mongoDB connected");
    })
    .catch(err => {
        console.log(err);
        console.log("Failed to connect to mongoDB");
    });

//Routes
app.get('/', (req, res) => {
    res.send('Hello world!!');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Backend server listening on port ${port}');
})