const counsellorModel=require('../models/counsellor.model');
const mailer=require('../utils/mailer');
const userModel=require('../models/user.model');

const counsellor={
    counsellors:async(req,res)=>{
        try{
            const counsellors=await counsellorModel.find().select(['-__v','-email']);
            return res.status(200).json(counsellors);
        }
        catch(err)
        {
            return res.status(500).json({message:"internal server error"})
        }
    },
    bookAppointment:async(req,res)=>{
        try{
            const user=await userModel.findOne({_id:req.user});
            const {counsellorId, date, time}=req.body;
            const counsellor=await counsellorModel.findOne({_id:counsellorId});
            await mailer(counsellor.email,user.name,user.email,date,time);
            return res.status(200).json({message:"appointment booked successfully."})
        }
        catch(err){
            return res.status(500).json({message:"internal server error"});
        }
    }
}

module.exports=counsellor