const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport =  require('passport');

dotenv.config({path : './.env'})


mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/APIAuthentication',  { useNewUrlParser: true , useUnifiedTopology: true  });

const app = express();

//Middleware

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./passport')(passport);

//require('./routes/users')(passport);
// require('./passport')

//Routes
app.use('/users', require('./routes/users'));

///start server

const port =  process.env.PORT || 3000;
app.listen(port);
console.log(`server listening ${port}`);


