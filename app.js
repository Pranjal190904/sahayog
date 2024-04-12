const express= require('express');
const app=express();
const {port}=require('./config/env.config');
const connectDb=require('./config/db.config');
const cookieParser=require('cookie-parser');
const userRoutes=require('./routes/user.route');

connectDb();
app.use(express.json());
app.use(cookieParser());
app.use('/v1/user',userRoutes);
app.listen(port);
