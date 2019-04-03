require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes/index');

const cors = require('cors');
const app = express();
const router = express.Router();

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


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

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));

//Routes
app.get('/', (req, res) => {
    res.send('Hello world!!');
});

app.use('/api/v1', routes(router));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Backend server listening on port '+port);
})