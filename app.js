const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

dotenv.config({path : './.env'})

mongoose.connect('mongodb://localhost/APIAuthentication',  { useNewUrlParser: true , useUnifiedTopology: true  });

const app = express();

//Middleware

app.use(morgan('dev'));
app.use(bodyParser.json());

//Routes
app.use('/users', require('./routes/users'));

///start server

const port =  process.env.PORT || 3000;
app.listen(port);
console.log(`server listening ${port}`);


