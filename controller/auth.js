const mysql = require('mysql');
const jwt = require('jsonwebtoken');
var express=require('express');
const bcrypt = require('bcryptjs');
const {promisify} = require('util');
const validator=require('email-validator');
const nodemailer=require('nodemailer');
const session    = require("express-session");
const dotenv = require('dotenv');
dotenv.config();
const { notEqual } = require('assert');
let app=express();
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sequelize_passport'
});


var a,b,c,d;
var OTP;
var STRINGOTP;
var randomstring;
exports.login=async (req,res)=>{
        const {email,password}=req.body;
        if(!email||!password){
            return res.render('login',{
                message : 'Please enter email and Password' 
            })
        }
        
    db.query("SELECT * FROM users WHERE email=?",[email], async (error,results)=>{
        if(error)
        {console.log(error);}
        if(results.length==0||((results.length>0)&&(!(await bcrypt.compare(password,results[0].password)))))
        {
            return res.render('login',{message: 'Incorrect Email or Password'});
        }
        else{
            return res.render('index',{message : 'Hi, ' +results[0].name + ' You have been successfully logged in'});
        }

    });
}

exports.forgotpassword =async (req,res)=>{
    OTP=Math.floor(Math.random() * (1000000 - 100000) ) + 100000;
    STRINGOTP=OTP.toString();
    db.query("SELECT email FROM users WHERE email =?", [req.body.email],async(error,results)=>{
        if(error){
            console.log(error);
        }
        else{
        if((results.length)==0){
            return res.render('forgotpassword',{message: 'You havenot Registered yet'});
        }
        }
    });
    if(validator.validate(req.body.email))
    {
        let transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASSWORD
            }
        });
        
        let mailOptions={
            from:process.env.EMAIL,
            to:req.body.email,
            subject:"Resetting Password",
            text:"Your 6 digit OTP is "+ STRINGOTP,
        };

        transporter.sendMail(mailOptions,(err,data)=>{
            if(err)
            {
                console.log(err);
            }
            else
            {
                d=req.body.email;
                res.redirect("/validationforresetpassword");
            }
        });
    }
    else
    {
        return res.render('forgotpassword',{message : 'Invalid Email'});
    }
}

exports.resetpassword=async (req,res)=>{
    const { password,passwordCheck }=req.body;
    if(!password||!passwordCheck)
    return res.render('resetpassword',{message: 'Please fill the details'});
    if(password==passwordCheck)
    {
        db.query("SELECT email FROM users WHERE email =?", [d],async(error,results)=>{
            if(error){
                console.log(error);
            }
            else{
            if((results.length)==0){
                return res.render('resetpassword',{message: 'You havenot Registered yet'});
            }else{
                let hashedPassword=await bcrypt.hash(password,8);
            
                db.query("UPDATE users SET password='"+hashedPassword+"' WHERE email=?",[d],async (error,results)=>{
                    if(error){
                        console.log(error);
                    }
                    else{
                        return res.render('index',{message: 'Password Successfully Updated'});
                    }
                });
            }
            }
        });
    }
    else
    {
        return res.render('resetpassword',{message : 'Password and Confirm Password are not matched'});
    }
}

exports.validationforresetpassword =async (req,res)=>{
    const check=req.body.otp;
    if(check==STRINGOTP)
    {
        res.redirect("/resetpassword");
    }
    else
    {
        return res.render('validationforresetpassword',{message: 'OTP is wrong'});
    }
}
exports.validate =async (req,res)=>{
    const check=req.body.otp;
    
    if(check==STRINGOTP)
    {
        let hashedPassword=await bcrypt.hash(c,8);
                db.query( "INSERT INTO users SET ?",{ name: a, email : b, password : hashedPassword},(error,results)=>{
                    if(error){
                    console.log(error);
                }
                else{
                    return res.render('login',{message: 'You are registered .Now you can login with your credentials'}); 
                }
                });
    }
    else
    {
        return res.render('validate',{message: 'OTP is wrong'});
    }
}


exports.register =function(req,res){
    OTP=Math.floor(Math.random() * (1000000 - 100000) ) + 100000;
    STRINGOTP=OTP.toString();
    const {name,email,password,passwordCheck} =req.body;
    console.log(req.body);
    db.query("SELECT email FROM users WHERE email =?", [email],async(error,results)=>{
        if(error){
            console.log(error);
        }
        else{
        if((results.length)>0){
            return res.render('register',{message: 'The email have been already taken'});
        }else if(password!==passwordCheck){
            return res.render('register',{message: 'Passwords didnot match'});
        }
        else {

            if(validator.validate(email))
            {
                a=name;
                b=email;
                c=password;
                let transporter=nodemailer.createTransport({
                    service:'gmail',
                    auth:{
                        user:process.env.EMAIL,
                        pass:process.env.PASSWORD
                    }
                });
        
                let mailOptions={
                    from:process.env.EMAIL,
                    to:req.body.email,
                    subject:"Email Validation",
                    text:"Your 6 digit OTP is "+ STRINGOTP,
                };
        
                transporter.sendMail(mailOptions,(err,data)=>{
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        d=req.body.email;
                        res.redirect("/validate");
                    }
                });
            }
            else
            {
                return res.render('register',{message: 'Invalid Email'});
            }
        }

    }
    });
}

exports.isLoggedIn = async (req, res, next) => {
    console.log(req.cookies);
    if (req.cookies.jwt) {
        try {
            //Verify the token
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, 'MySecretKey');
            
            console.log(decoded);
            //Check if the user still exists
            db.query("SELECT * FROM users where id = ?", [decoded.id], (error, result) => {
                console.log(result);
                if (!result) {
                    return next();
                }
                req.user = result[0];
                return next();
            });
        } catch (error) {
            console.log(error);
        }
    } else {
        next();
    }
}

exports.logout = async (req, res) => {
    res.cookie('jwt', req.cookies.jwt, {
     expires: new Date(1),
        httpOnly: true,
        path:'/',
        secure:true,
        samesite:true,
        maxage:600000
    });
    res.clearCookie('jwt');
        console.log('logout successfully')
        res.redirect('/login');
    
    }
  
    exports.generate =async (req,res)=>{
        randomstring=Math.random().toString(36).substr(2, 5);
        let transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASSWORD
            }
        });
        
        let mailOptions = {
            
            from: '"migrationdiya@gmail.com', // sender address
            to: req.body.user_email, // list of receivers
            subject: 'client onboarding', // Subject line
            text: ' you can login using the link provided link ,your login Details are your email address for username and password is '+randomstring , // plain text body
            
            
        };
  
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response,{message: 'successfully generated'});
                res.render('user_view');
            });
        
        }