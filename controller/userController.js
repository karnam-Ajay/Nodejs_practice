const asyncHandler = require("express-async-handler");
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
        throw new Error("User already registered");
    }


    res.json({message:"register the user"});
});


//@desc user login
//@route Post api/users/login
//@access public

const userLogin = asyncHandler(async (req,res)=>{
    res.json({message:"user logged in"})
});

//@desc current user info
//@route Get api/users/current
//@access private
const currentUser = asyncHandler(async (req,res)=>{
    res.json({message:"current user info"})
})

module.exports = {registerUser,userLogin,currentUser};