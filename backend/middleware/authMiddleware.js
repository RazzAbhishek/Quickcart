const jwt =require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes

const protect =async (req , res , next)=>{
    let token;

    if(
        req.headers.authorization && req.headers.authorization.startsWith("Bearer")
    ){
        try{
            token=req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token,process.env.JWT_SECRET);

             // Get user from token, exclude password
            req.user = await User.findById(decoded.user.id).select("-password");
            next();
        }catch (error){
            console.error("Token verification failed:", error.message);
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

// middleware to check if the user is an admin

const admin =(req,res,next)=> {
    if (req.user && req.user.role === "admin") {
        next();
    }else{
        res.status(403).json({message:"Not Authorized as an admin"});
    }
};
module.exports = { protect ,admin };