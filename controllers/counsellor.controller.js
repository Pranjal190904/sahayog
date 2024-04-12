const counsellorModel=require('../models/counsellor.model');

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
    }
}

module.exports=counsellor