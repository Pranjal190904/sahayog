const userModel=require('../models/user.model');
const bcrypt=require('bcrypt');
const signAccessToken=require('../utils/token');

const user={
    register:async(req,res)=>{
        try{
            const {name,email,password,age,wellWisherName,wellWisherEmail,specialistName,specialistEmail}=req.body;
            const hashedPassword=await bcrypt.hash(password,10);
            const newUser=new userModel({
                name:name,
                email:email,
                password:hashedPassword,
                age:age,
                wellWisherName:wellWisherName,
                wellWisherEmail:wellWisherEmail,
                specialistName:specialistName,
                specialistEmail:specialistEmail
            });
            await newUser.save();
            return res.status(200).json({message:"User registered successful."});
        }
        catch(err)
        {
            return res.status(500).json({message:"internal server error"});
        }
    },
    login:async(req,res)=>{
        try{
            const {email,password}=req.body;
            const user=await userModel.findOne({email:email});
            if(!user)
            {
                return res.status(404).json({message:"user not found"});
            }
            const matchPassword=bcrypt.compare(password,user.password);
            if(!matchPassword)
            {
                return res.status(400).json({message:"password incorrect"});
            }
            const accessToken=await signAccessToken(user._id);
            res.cookie('accessToken',accessToken,{httpOnly:true,sameSite:'None',secure:true});
            return res.status(200).json({message:"login successful"});
        }
        catch(err)
        {
            return res.status(500).json({message:"internal server error"});
        }
    }
}

module.exports=user;