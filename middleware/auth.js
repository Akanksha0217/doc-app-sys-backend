const jwt = require("jsonwebtoken")
const User = require("../models/userModel");
require("dotenv").config()

async function auth(req, res, next) {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({
        success: false,
        message: "Token not found"
      })
    }

    const authHeader = req.headers.authorization

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(400).json({
        success: false,
        message: "Authorization header must start with Bearer"
      })
    }

    const token = authHeader.split(" ")[1]

    const decoded = jwt.verify(token, process.env.SECREAT_KEY)

     const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ["password"] }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    req.user = decoded
    next()

  } catch (error) {
    console.error(error)
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    })
  }
}
  function Doctor(req,res,next){
    if(req.user.role === 'Doctor'){
        next()
    }else{
        res.status(403).json({
  success: false,
  message: "You are not authorized" 
})
    }
}

function Admin(req,res,next){
  if(req.user.role==="Admin"){
    next()
  }else{
    res.status(403).json({
      success :false,
      message :"YOU are not authorized"
    })
  }

}





module.exports = {auth,Doctor,Admin}