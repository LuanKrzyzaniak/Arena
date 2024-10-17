const jwt = require("jsonwebtoken");

function checkVerified(req,res,next){
    const token  = req.cookies.tokenuser;
    if(!token){
        return res.status(401).json({ auth: false, message: "Access denied. No token provided." });
    }

    try{
        const verified = jwt.decode(token);
        if(verified.user.verified == true){
            next();
        }
    }catch(error){
        console.log(error);
        res.status(401).json({auth:false,message:"Not verified"})
    }
}

module.exports={checkVerified}
