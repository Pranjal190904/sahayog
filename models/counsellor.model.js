const mongoose=require('mongoose');

const counsellorSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String
    },
    qualification:{
        type:String
    },
    experience:{
        type:Number
    }
})

module.exports=mongoose.model("Counsellor",counsellorSchema);