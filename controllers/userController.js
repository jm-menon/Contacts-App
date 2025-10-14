const asyncHandler = require('express-async-handler');
//async error handler of express allows for handling asychronous errors without having to write try catch blocks
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');

//@desc register users
//@route to register user
//@access public
const registerUsers= asyncHandler(async(req, res)=>{
    console.log('hii');
    const {name, email, password}= req.body;
    if(!name || !email ||!password){
        res.status(400);
        throw new Error("All fields are mandatory!!!")
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User with email already registered!")
    }
    //encryot the raw password
    const hashedPassword= await bcrypt.hash(password, 10);
    console.log("Hashed password is: ", hashedPassword);

    const createUser= await User.create({
        name,
        email,
        password: hashedPassword,
    })
    if(!createUser){
        res.status(400);
        throw new Error("Can't create user")
    }
    res.status(201).json({createUser});
    console.log("Success");
    
});

//@desc login users
//@route to login user
//@access public
const loginUsers= asyncHandler(async(req, res)=>{
    const {email, password}= req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("Validation error occured :(")
    }
    const user= await User.findOne({email});
    if(!user){
        res.status(401);
        throw new Error("User not found")
    }
    if(user &&(await bcrypt.compare(password, user.password))){
        const accessToken= jwt.sign({
            user:{
                name: user.name,
                email: user.email,
                id: user.id
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "10m"}
        
    )
        res.status(201).json(accessToken);
        //res.json("login the user")
    }else{
        res.status(401);
        throw new Error("Email or password is not valid")
    }
});

//@desc current users info
//@route to current user
//@access private
const currentUsers= asyncHandler(async(req, res)=>{
    res.json("current the user")
});

module.exports= {registerUsers, loginUsers, currentUsers};