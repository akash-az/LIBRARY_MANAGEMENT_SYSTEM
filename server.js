if (process.env.NODE_ENV !== 'production'){        // here after setting up database url in .env file we just tell our
                                                   //  application to load in into our application also 
                                                   //perform check to check if we arre runningin our production environment or not, set to default by node , 
                                                   //to make sure to load only when we are in devlopement environment and not in production
    require('dotenv').config()                       // if above condition false then load .env database url and load in process.env.DATABASE_URL
}

//for setting up server server.js

const express = require('express') //import express form express library
const app = express()
const expressLayouts = require('express-ejs-layouts')

//configuration of our express application

const indexRouter = require('./routes/index') //aquire request handling resources for index route. ""./" -> represents relative path i.e relative to current directory 

app.set('view engine','ejs')  //set up view engine and using ejs as view engine
app.set('views',__dirname + '/views') // this is where are views are going to be coming from ,
                                      //   we are going to put them in views directory so we want to get current directory name.this is where all the views of our server be
app.set('layout','layouts/layout')               // idea behind layout file is that every single file will be put inside of this layout file
                                                  // so we dont have to write beggining and ending parts of our html file, such as headers/footes

app.use(expressLayouts)                           // tell our express application that we want to use express Layouts ->pass expressLaout variable that we included from the library                                   

app.use(express.static('public'))                                            // tell express where are public files are going to be, files like stylesheets , js , images / public name is commonly used for reference

const mongoose = require('mongoose')                                // import mongoose from mongoose library -> mongoose is library for easy integration of mongodb database with our application
mongoose.connect(process.env.DATABASE_URL)                                                  //set yp connectoin to database (we could have just passed the url in our database ), but bcus we dont want to hardcode it but instead make it dependent on the environment 
                                                                    // but when our application is deployed we want it to be connected to our web somewhere.
                                                                    // so to setup database connection url dynamically we will pass a string(process.env.DATABASE_URL)for the url which will come from our environment 
                                                                    // and next parameter "only required for old maongoDB version" {}  is for providing an option of how we are going to set up mogoDB in our environment   
const db = mongoose.connection                                       // to log if we are or not connected to our database
db.on('error', error => console.error(error))                       // to log error on console when database is not connected properly
db.once('open', () => console.log("connected to mongoose"))          // to run only once and log if connected to mongoose
                                                                // if we run our app now, it will show error bcus our app does not have this variable (process.env.DATABASE_URL) for our database 
                                                                    // to resolve this we will install "dotenv" library which will allow us to load environment variable into our app
                                                                    // code for above -> terminal -> npm i --save-dev dotenv  since we only want it tobe locally that we want to use it.
app.use('/',indexRouter);                                       // using indexRouter to handle request on main index page
app.listen(process.env.PORT || 3000)                                                                 // tell that we want to listen on a certain port and pass (process.env.PORT) which is going to pull from an environment variable ,
                                                                             // and server is going to tell the port number on which it is listening  and for developement purpose (|| 3000) , bcus our server is not telling us anything for our hosting platform

                                                                             //this is all we need to get our server up and running

                                                                             //after setting up server run command npm run devStart goto -> localhost:3000 // output cannot GET/ bcus we havent set up any routes.
                                                                              // for routes we should should using mvc architecture and not put all our routes in one single server.js file instead we create multiple routes or controllers in routes folder.
                                                                                // in node js, express environment controllers are called routes
                                                                                // created models for storing all database models
                                                                                // finally our mvc structure is created.
                                                                                // first we set up an index route for when we dont have anything in database or models
