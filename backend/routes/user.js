const express = require('express');
const passport = require('passport');
const router = express.Router()
const User = require('../models/user')
const Stock = require('../models/stock')
const axios = require('axios')
require('../passport.js')

const {ensureAuth} = require('../middleware/ensureAuth');
const stock = require('../models/stock');
const { response } = require('express');

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
        let timeFrame = req.query.timeFrame
        switch(timeFrame){
            case('1D'):
                timeFrame = -1
                break
            case('5D'):
                timeFrame = -5
                break;
            case('1M'):
                timeFrame = -30
                break;
            case('3M'):
                timeFrame = -90
                break
            case('1Y'):
                timeFrame = -365
                break;
            default:
                timeFrame = 0
        }
        
        return res.send(balance.slice(timeFrame))
    }catch(err){
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
       
        const userStocks = await Stock.findOne({'user':req.user, 'ticker': ticker}, {"_id":0,"ticker":1})
        res.send(userStocks !== null).status(200)
    }catch(err){
        res.send(err).status(400)
    }
})

module.exports = router