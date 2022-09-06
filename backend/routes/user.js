const express = require('express');
const passport = require('passport');
const router = express.Router()
const User = require('../models/user')
const Stock = require('../models/stock')
const axios = require('axios')
require('../passport.js')

const {ensureAuth} = require('../middleware/ensureAuth');
const stock = require('../models/stock');

const options = {
    headers: {
        'X-API-KEY': process.env.YF_API_KEY
    }
}

router.get('/current', (req,res)=>{
    try{
        res.status(200).send(req.user)
    }catch(err){
        return err;
    }
})

router.get('/buyingPower', ensureAuth,async(req,res)=>{
    try{
        const buyingPower = await req.user.buyingPower
        res.send({"buyingPower":buyingPower})
    }catch(err){
        console.log(err)
    }
    
})

router.get('/reset',ensureAuth,async(req,res)=>{
    console.log("Post made")
    try{
        req.user.buyingPower = 1000000
        await req.user.save()
        const stocks = await Stock.find({user:req.user})
        await Stock.deleteMany({user:req.user})
        res.send("Profile reset")
    }catch(err){
        conssole.log(err)
        res.status(400).send("Could not reset profile")
    }
})

router.get('/balance',ensureAuth,async(req,res)=>{
    try{
        const balance = req.user.balance
        return res.send(balance)
    }catch(err){
        console.log("There is an error caught in the endpoint")
        console.log(err)
        return res.status(400).send()
    }
})

router.delete('/delete',ensureAuth,async(req,res)=>{
    const user = req.user
    console.log(user)
    try{
        await user.delete()
        return res.send()
    }catch(err){
        console.log(err)
    }

})
router.get('/ownsStock',ensureAuth,async (req,res)=>{
    try{
        const ticker = req.query.ticker
        console.log(ticker)
        const userStocks = await Stock.findOne({'user':req.user, 'ticker': ticker}, {"_id":0,"ticker":1})
        if(userStocks){
            return res.send(true).status(200)
        }
        return res.send(false).status(200)
    }catch(err){
        res.send(err).status(400)
    }
})

module.exports = router