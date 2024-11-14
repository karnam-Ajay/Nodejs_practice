const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const tokenValidation = asyncHandler(async (req,res,next)=>{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        // here we are taking first index bacause 0th index is bearer
         token = authHeader.split(" ")[1];

         // verify the token
         jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if (err) {
                res.status(401);
                throw new Error("User is not authorized");
            }
            // verify with the decoded user
            req.user = decoded.user;
            next();
         })
         if (!token) {
            res.status(401);
            throw new Error("User is not authorized or token is missing");
         }
    }
});

module.exports = tokenValidation;