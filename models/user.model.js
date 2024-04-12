const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    age:{
        type:Number
    },
    wellWisherName:{
        type:String
    },
    wellWisherEmail:{
        type:String
    },
    specialistName:{
        type:String
    },
    specialistEmail:{
        type:String
    }
})

module.exports=mongoose.model("User",userSchema);