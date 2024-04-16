const userModel=require('../models/user.model');
const bcrypt=require('bcrypt');
const signAccessToken=require('../utils/token');
const mailer=require('../utils/mailer');
const axios=require('axios');

const user={
    register:async(req,res)=>{
        try{
            const {name,email,password,age,wellWisherName,wellWisherEmail,specialistName,specialistEmail}=req.body;
            const user=await userModel.findOne({email:email});
            if(user)
            {
                return res.status(400).json({message:"user already registered"});
            }
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
            const matchPassword=await bcrypt.compare(password,user.password);
            if(!matchPassword)
            {
                return res.status(400).json({message:"password incorrect"});
            }
            const accessToken=await signAccessToken(user._id);
            res.cookie('accessToken',accessToken,{httpOnly:true,sameSite:'None',secure:true});
            return res.status(200).json({message:"login successful",name:user.name});
        }
        catch(err)
        {
            return res.status(500).json({message:"internal server error"});
        }
    },
    stressLevel:async(req,res)=>{
        try{
            const {temp,stepCount}=req.body;
            const url="https://stressdetectorhack36.onrender.com/predict";
            const payload=[{"C":temp,"Step count":stepCount}];
            const {data} = await axios.post(url, payload);
            if(data.prediction[0]==2)
            {
                const userId=req.user;
                const user=await userModel.findOne({_id:userId});
                await mailer.stress(user.wellWisherEmail,user.name,user.wellWisherName);
            }
            return res.status(200).json({stressLevel:data.prediction[0]});
        }
        catch(err)
        {
            return res.status(500).json({message:"internal server error"})
        }
    },
    profile:async(req,res)=>{
        try{
            const userId=req.user;
            const user=await userModel.findOne({_id:userId}).select(['-_id','-password','-__v']);
            return res.status(200).json(user);
        }
        catch(err){
            return res.status(500).json({message:"internal server error"});
        }
    }
}

module.exports=user;