const {dbUrl}=require('../config/env.config')
const mongoose=require('mongoose')

const connectDb=()=>{
    try{
        mongoose.connect(dbUrl);
    }
    catch(error){
        console.log(error);
    }
}

module.exports=connectDb;