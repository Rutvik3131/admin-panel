const express = require('express');
const router = express.Router();
const authController = require('../controller/auth');
router.get('/', (req, res) => {
    res.set('Cache-Control', "no-cache='Set-Cookie, Set-Cookie2'");
    res.render('login');
});
router.get('/register', (req, res) => {
    res.set('Cache-Control', "no-cache='Set-Cookie, Set-Cookie2'");
    res.render('register');
});

router.get('/login', (req, res) => {
    res.set('Cache-Control', "no-cache='Set-Cookie, Set-Cookie2'");
    res.render('login');
});

router.get('/user_profile', authController.isLoggedIn, async (req, res) => {
    //if (req.user) {
        res.render('user_profile', {user: req.user});
    //} else {
    //    res.redirect('/login');
    });
//});


router.get('/index', authController.isLoggedIn, async (req, res) => {
    if (req.user) {
        res.render('index', {user: req.user});
    } else {
        res.redirect('/login');
    }
});


router.get("/validate",(req,res)=>{
    res.set('Cache-Control', "no-cache='Set-Cookie, Set-Cookie2'");
    res.render("validate");
});

router.get("/forgotpassword",(req,res)=>{
    res.set('Cache-Control', "no-cache='Set-Cookie, Set-Cookie2'");
    res.render("forgotpassword");
});

router.get("/resetpassword",(req,res)=>{
    res.set('Cache-Control', "no-cache='Set-Cookie, Set-Cookie2'");
    res.render("resetpassword");
});

router.get("/validationforresetpassword",(req,res)=>{
    res.set('Cache-Control', "no-cache='Set-Cookie, Set-Cookie2'");
    res.render("validationforresetpassword");
});

router.get('/user_add', authController.isLoggedIn, async (req, res) => {
    //if (req.user) {
        res.render('user_add', {user: req.user});
    //} else {
       // res.redirect('/login');
    });
//});

router.get('/document', authController.isLoggedIn, async (req, res) => {
    //if (req.user) {
        res.render('document', {user: req.user});
    //} else {
       // res.redirect('/login');
    });
//});


module.exports = router;