const nodemailer=require('nodemailer');
const {mailUser,mailPass}=require('../config/env.config')

const transporter=nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: mailUser,
        pass: mailPass
    }
})
const mailer=async(email,userName,userEmail,date,time)=>{
    const options={
        to: email,
        subject: "Appointment for counselling",
        html: `<p style="font-size: 20px">Hello,<br>${userName} just booked an appointment for counselling.<br>Date: ${userEmail}<br>Time: ${time}<br>Contact Email: ${email}</p>`
    }
    await transporter.sendMail(options);
}

module.exports=mailer;