require('dotenv').config();

const port=process.env.PORT;
const dbUrl=process.env.DBURI;
const accessTokenSecret=process.env.ACCESSTOKENSECRET;

module.exports={port,dbUrl,accessTokenSecret};