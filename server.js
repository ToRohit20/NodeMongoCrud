// Add Express Module
const express = require('express');
// dotenv is required for your secret access on your server 
// example:- PORT at which your server will run or mongodb connection string.
const dotenv = require('dotenv');
// required for logging the time of each request 
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

const connectDB = require('./server/database/connection')
// Initiate express in app const.
const app = express();

// obtains the env file 
dotenv.config( {path:'config.env'})
// Obtains the PORT from env file, if not found then go with 8080.
const PORT = process.env.PORT || 8080;

//log request
app.use(morgan('tiny'));
//mongoDB connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({extended :true}))

// set view engine
app.set("view engine","ejs")

// just for reference if your ejs file are in another folder
//app.set("views",path.resolve(__dirname,"views/ejs")) 

//Load assest
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
//Load img folder
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
//Load js folder
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

//load routers
app.use('/',require('./server/routes/router'))

// Defines at which PORT server is running
app.listen(PORT,()=>{console.log(`Server is running on http://localhost:${PORT}`)});