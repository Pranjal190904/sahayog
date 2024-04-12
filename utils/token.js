const jwt=require('jsonwebtoken')
const {accessTokenSecret}=require('../config/env.config')

const signAccessToken=async(id)=>{
    const payload={
        aud: id
    }
    const options={
        expiresIn: '10d'
    }
    const accessToken=jwt.sign(payload,accessTokenSecret,options);
    return accessToken;
}

module.exports=signAccessToken;