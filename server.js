//all things we need to get server running
const dotenv = require('dotenv')
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require ('body-parser')
const methodOverride = require("method-override")
const bcrypt = require('bcryptjs')
const cors = require('cors')
const session = require('express-session')
const PORT = process.env.PORT || 9000
const path = require("path");

//CORS allows requests to come in from React, thts is all you have to do on the backend to allow credentials to be included with requests

    app.use(cors({
        credentials: true,
        //wha† origin is allowable for requests?
        origin:"http://localhost:3000"
    }));


app.use(session({
    secret: "fraggle-rock",
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) =>{
    console.log("this is who's registering")
    console.log(req.session.userId)
    next()
})

//set up CORS as middleware
// app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());


app.use(express.static('public'));
app.use(methodOverride('_method'))

//When a new user registers their user id should show in thier next request
app.use((req, res, next) =>{
    console.log("this is who's logged in")
    console.log(req.session.userId)
    next()
})

    //.populate added so created chocolate will also have a userId attached
 app.get('/api/v1/Chocolates', async (req, res, next) => {
        console.log(req.body, 'get all the chocolates')
        try{
            const allChocolat = await Chocolat.find().populate('user')
        console.log(allChocolat)
        //this is the response to react--->
            res.json({
                status: {
                    code: 200,
                    message: "success"
                },
                data: allChocolat
            })
        } catch (err){
            res.send(err)
        }
    })


//connection string/database name
const mongoURI = 'mongodb://localhost:27017/' + 'chaletchocolat'
const db = mongoose.connection;
mongoose.connect(process.env.MONGODB_URI || mongoURI, {
    //this will prevent the break we are warned is coming in the future
    useNewUrlParser: true, 
    useCreateIndex: true,
    useFindAndModify: false}, () => {
        //callback so we know that it worked 
    console.log('the connection with mongodb is established')
   
});



//Global Configuration
//require the Chocolat object
const Chocolat = require('./Models/Chocolates')
const User = require('./Models/Users')

//just in case things go wrong...

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', mongoURI));
db.on('disconnected', () => console.log('mongo disconnected'));

const chocolatController = require('./Controllers/chocolatController')
const userController = require('./Controllers/userController')

app.use('/api/v1/Chocolates', chocolatController)
app.use('/api/v1/user', userController)


if (process.env.NODE_ENV === "production") {
    // Exprees will serve up production assets
    app.use(express.static("client/build"));
    // Express serve up index.html file if it doesn’t recognize route 
    app.get("*", (req, res) => {
    //   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
      res.sendFile(path.join(__dirname, "client", "build", "index.html"));

    });
   }

   app.listen(PORT, () => {
    console.log('listening on port 9000')
});