const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema")
// @desc user registration
// @route Post api/users/register
// @access public

const registerUser = asyncHandler(async (req,res)=>{
    const {username,email,password} = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const userAvailable =  await User.findOne({email});

    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered!");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password,10);
    console.log("hashed password: ",hashedPassword);
    const user = await User.create({
        username,
        email,
        password:hashedPassword
    });
    if (user) {
        // here we need to use else if with return because Only one response can be sent per request!
        // otherwise it will through ERROR: Can't set headers after they are sent to the client

       return res.status(201).json({_id:user.id,email:user.email})
    }
    else if(!user){
        return res.status(400).json("User data is not valid");
    }
    console.log(`user created ${user}`);
    
    return res.json({message:"register the user"});
});


//@desc user login
//@route Post api/users/login
//@access public

const userLogin = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const user = await User.findOne({email});
    // compare password with hashed password
    if(user && (await bcrypt.compare(password,user.password))){
        const accesToken = await jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"1m"}
    );
    res.status(200).json({accesToken});
    }
    else{
        res.status(401);
        throw new Error("email or password is not valid!");
    }
});

//@desc current user info
//@route Get api/users/current
//@access private
const currentUser = asyncHandler(async (req,res)=>{
    res.json({message:"current user info"})
})

module.exports = {registerUser,userLogin,currentUser};