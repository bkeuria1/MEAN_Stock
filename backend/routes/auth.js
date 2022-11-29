const express = require('express');
const passport = require('passport');
const router = express.Router()
const User = require('../models/user')
const {ensureAuth} = require('../middleware/ensureAuth');
const { register, singInLocal,failed } = require('../controllers/AuthController');

router.post('/register', register)
router.post('/local', passport.authenticate('local'
, { 
  failureRedirect: '/failed' }
),(req,res)=>{
    res.status(201).send({"user": "User Created"})
})
router.get('/failed', failed)

router.get('/loggedIn', (req,res)=>{
  res.send({result: req.isAuthenticated()})
})

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/callback', passport.authenticate('google'
, { 
  failureRedirect: '/failed' }
),(req,res)=>{
    res.redirect(process.env.REDIRECT_URL);
})
  
//Logout
router.get('/logout', ensureAuth, (req, res) => {
  try{
    req.logout();
    res.redirect(process.env.HOME_URL)
  }
  catch(err){
    res.redirect(process.env.HOME_URL)
  }
  
})

module.exports = router