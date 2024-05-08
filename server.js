const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoute = require('./routes/authRoute');
const bookRoute = require('./routes/booksRoute');
const config = require('./config/config');
const bodyParser = require("body-parser")
const errorHandler = require('./controllers/errorController/errorController');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(errorHandler);

app.use('/auth' , authRoute);
app.use('/books' , bookRoute);

mongoose.connect(config.mongoConn).then((conn)=>{
    console.log('MongoDB connected successfully');
}).catch((err)=>{
    console.log(err.message);
});

app.listen(3000 , ()=>{
    console.log("Running...");
});