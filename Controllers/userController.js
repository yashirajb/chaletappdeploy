//Controller for logging in and registering 

const express = require('express');
const router = express.Router()
const User = require('../Models/Users')
const bcrypt = require('bcryptjs')

router.post('/login', async (req, res) => {
    try{
        const foundUser = await User.findOne({username: req.body.username})
        console.log(foundUser, 'foundUser');

        if(foundUser){
            //bcrypt compare returns true of false
            if(bcrypt.compareSync(req.body.password, foundUser.password)){
                // if valid we'll set the session
                req.session.userId = foundUser._id;
                req.session.username = foundUser.username;
                req.session.logged = true;

                res.json({
                    status: {
                        code: 200
                    },
                    data: foundUser
                })

                // res.redirect('/authors') don't use becuase we are using react
            } else {
                req.session.message = 'Username or Password incorrect';
                res.json({
                    status: {
                        code: 500,
                        message: "Invalid Credentials"
                    }
                })
        }
 } else {

    req.session.message = 'Username or Password incorrect';
    res.json({
        status: {
            code: 500,
            message: "Invalid Credentials"
        }
    })
}


    } catch(err){
        res.send(err)
    }
});

router.post('/register', async(req, res) =>{
//Encrypt password
    const password = req.body.password;
//encrypt password
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    console.log(hashedPassword)

    req.body.password = hashedPassword
    
   //we create our user 
    try {
        const createdUser = await User.create(req.body)
        console.log(createdUser, 'created user')
//req.session super important---everything the user does will be tracked here. On the FRONTEND there will be a cookie stored in their browser
//contains an id of what session they are, so when the user sends any request it will look at the cookie that was included (the headers sent with the request)
//and it stores it in an object req.session
        req.session.userId = createdUser._id;
        req.session.username = createdUser.username;
        // req.session.logged = true;
        req.session.logged = true;

        res.json({
            status: {
            code: 201 
            },
            data: createdUser   
        })
        // Commented out below 9/15/19
        // res.redirect('/');
    } catch (err){
        console.log("Can't register user")
        res.send(err)
    }
});


router.get('/logout', (req,res) => {
    req.session.destroy((err) => {
        if(err){
            res.send(err);
        }else {
            res.redirect('/')
        }
    })
})


module.exports = router; 