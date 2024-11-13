const asyncHandler = require("express-async-handler")
// @desc user registration
// @route Post api/users/register
// @access public

const registerUser = asyncHandler(async (req,res)=>{
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