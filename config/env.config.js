require('dotenv').config();

const port=process.env.PORT;
const dbUrl=process.env.DBURI;
const accessTokenSecret=process.env.ACCESSTOKENSECRET;
const mailUser=process.env.MAILUSER
const mailPass=process.env.MAILPASS

module.exports={port,dbUrl,accessTokenSecret,mailUser,mailPass};