    const jwt=require("jsonwebtoken")


const ensureAuthenticated=(req,res,next)=>{
    const auth=req.headers['authorization'];
    if(!auth){
        return res.status(403)
        .json({message:"Unauthorized, Jwt token is require"})
    }
    try{
        const decorded=jwt.verify(auth,process.env.JWT_SECRET);
        req.user=decorded;
        next();
    }catch(err){
         return res.status(403)
        .json({message:"Unauthorized, Jwt token is wrong or expired"})

    }
}

module.exports=ensureAuthenticated