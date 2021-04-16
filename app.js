const express = require('express');
const app = express();
const mysql = require('mysql');
const path = require('path');
const cookieParser = require('cookie-parser');
const myParser = require("body-parser");
const noCache = require('nocache')
const nodemailer=require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const db= require('./config/db.config');  
// force: true will drop the table if it already exists
db.sequelize.sync().then(() => {
  console.log('Drop and Resync with { force: true }');
}); 




const hbs = require('hbs');
hbs.registerHelper("equal", require("handlebars-helper-equal"));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials', function (err) {});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
//Parse url encoded bodies like sent by html form
app.use(myParser.urlencoded({extended: false}));
// Cookie parser
app.use(cookieParser());
//Parse json bodies like sent by api request
app.use(myParser.json({extended: true}));


app.use(noCache())
//Define routes
app.use('/', require('./routes/pages'))
app.use('/auth', require('./routes/auth'));

//route for homepage
app.get('/user_view',(req, res) => {
  let sql = "SELECT * FROM details ";
  let query = db.query(sql, (err, results) => {
    if(err) throw err;
    res.render('user_view',{
      results: results
    });
  });
});

//


//route for insert data
app.post('/save',(req, res) => {
  let data = {
    user_enquiry:req.body.user_enquiry,
    user_title:req.body.user_title,
    user_name: req.body.user_name,
    user_surname:req.body.user_surname,
    user_birthday:req.body.user_birthday,
    user_email: req.body.user_email,
    user_phone_num: req.body.user_phone_num,
    user_marital_status: req.body.user_marital_status,
    user_country: req.body.user_country,
    user_passport_number: req.body.user_passport_number,
    user_livingaus: req.body.user_livingaus,
    user_arrivaldate: req.body.user_arrivaldate,
    user_departdate: req.body.user_departdate,
    user_ausvisa: req.body.user_ausvisa,
    user_visatype: req.body.user_visatype,
    user_visaexpirydate: req.body.user_visaexpirydate,
    user_spouse_citizen: req.body.user_spouse_citizen,
    user_occupation: req.body.user_occupation,
    user_education: req.body.user_education,
    user_resume: req.body.user_resume,
    user_job_offer: req.body.user_job_offer,
    user_comment: req.body.user_comment,
    user_appoint_agent: req.body.user_appoint_agent,
    user_start_process: req.body.user_start_process};
    let sql = "INSERT INTO details SET ?";
    let query = db.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/user_view');
    });
  });

//route for update data
app.post('/update',(req, res) => {
  let sql = "UPDATE details SET user_title='"+req.body.user_title+"',user_name='"+req.body.user_name+"', user_surname='"+req.body.user_surname+"',  user_birthday='"+req.body.user_birthday+"',  user_email='"+req.body.user_email+"',  user_phone_num='"+req.body.user_phone_num+"',  user_marital_status='"+req.body.user_marital_status+"',  user_country='"+req.body.user_country+"',  user_passport_number='"+req.body.user_passport_number+"',  user_livingaus='"+req.body.user_livingaus+"',  user_arrivaldate='"+req.body.user_arrivaldate+"',  user_departdate='"+req.body.user_departdate+"',  user_ausvisa='"+req.body.user_ausvisa+"',  user_visatype='"+req.body.user_visatype+"',  user_visaexpirydate='"+req.body.user_visaexpirydate+"',  user_spouse_citizen='"+req.body.user_spouse_citizen+"',  user_occupation='"+req.body.user_occupation+"',  user_education='"+req.body.user_education+"',  user_resume='"+req.body.user_resume+"',  user_job_offer='"+req.body.user_job_offer+"',  user_comment='"+req.body.user_comment+"',  user_appoint_agent='"+req.body.user_appoint_agent+"',  user_start_process='"+req.body.user_start_process+"' WHERE user_id="+req.body.id;
  let query = db.query(sql, (err, results) => {
    if(err) throw err;
    res.redirect('/user_view');
  });
});



//route for delete data
app.post('/delete',(req, res) => {
  let sql = "DELETE FROM details WHERE user_id="+req.body.user_id+"";
  let query = db.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/user_view');
  });
});

//



// Create a Server
var server = app.listen(3000, function () {
 
    var host = server.address().address
    var port = server.address().port
   
    console.log("App listening at http://%s:%s", host, port); 
  })