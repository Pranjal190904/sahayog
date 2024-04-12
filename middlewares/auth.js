const jwt=require('jsonwebtoken')
const {accessTokenSecret}=require('../config/env.config')

const auth=async(req,res,next)=>{
    try{
        const accessToken=req.cookies.accessToken;
        const decoded=jwt.verify(accessToken,accessTokenSecret);
        req.user=decoded.aud;
        next();
    }
    catch(err)
    {
        res.status(401).json({message:"Unauthorized"});
    }
}

module.exports=auth;