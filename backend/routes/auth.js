const express = require('express');
const passport = require('passport');
const router = express.Router()
const User = require('../models/user')
const {ensureAuth} = require('../middleware/ensureAuth')

router.get('/failed', ensureAuth,(req, res) => {
  res.send('<h1>Log in Failed :(</h1>')
});

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