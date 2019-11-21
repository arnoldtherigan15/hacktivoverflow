const cron = require('node-cron')
const nodemailer = require('nodemailer')
const User = require('./models/User')
const mongoose = require('mongoose')

require('dotenv').config()

mongoose.connect(process.env.URL_MONGOOSE, { useCreateIndex:true,useFindAndModify:true,useNewUrlParser:true,useUnifiedTopology:true })
.then (_=>{
    console.log('mongoose connect from cron')
})
.catch(console.log)

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_GMAIL,
        pass: process.env.PASSWORD_GMAIL
    }
})

cron.schedule("00 13 1 * *",function() {
    console.log("cron running")
    let data = []
    User.find()
        .then(result=>{
            for (let i = 0; i < result.length; i++) {
                data.push(result[i].email)
            }
            let mailOptions = {
                from: process.env.EMAIL_GMAIL,
                to: data,
                subject: 'Hacktiv Oferflow updated feature',
                text: 'hi aku berhasil kirim email'
            }
            transporter.sendMail(mailOptions, function(error, info) {
                if(error) {
                    console.log(error,'error send email')
                } else {
                    console.log('email successfully send')
                }
            })
        })
        .catch(err=>{
            console.log(err)
        })
    
})