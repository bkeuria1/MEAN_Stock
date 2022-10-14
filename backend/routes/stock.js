
const express = require('express');
const passport = require('passport');
const axios = require('axios')
const router = express.Router()
const User = require('../models/user')
const Stock = require('../models/stock')
const Symbols = require('../models/symbol')

// const Symbols = require('../models/symbol')

require('../passport.js')

const {ensureAuth} = require('../middleware/ensureAuth');

const options = {
    headers: {
        'X-API-KEY': process.env.YF_API_KEY
    }
};
router.get('/chart', ensureAuth, async(req,res)=>{
    const url = `https://alpha.financeapi.net/symbol/get-chart?period=${req.query.timeFrame}&symbol=${req.query.stock}`

    try{
        const results = await axios.get(url,options)
        res.send(results.data.attributes)
    }catch(err){
        console.log(err)
        res.status(400).send()
    }
})

router.get('/realtimePrice',ensureAuth, async(req,res)=>{
    console.log(req.query.stock)
    const url = `https://alpha.financeapi.net/market/get-realtime-prices?symbols=${req.query.stock}`

    try{
        const results = await axios.get(url,options)
     
        res.send((results.data.data[0].attributes.last.toString()))
    }catch(err){
        console.log(err)
        res.status(400).send()
    }
})
router.get('/userStocks', ensureAuth, async (req,res)=>{
    try{
        const userStocks = await Stock.find({user: req.user })
        const stockWithPrices = JSON.parse(JSON.stringify(userStocks))
        const tickerString = userStocks.reduce((prev,currentStock)=>prev+currentStock.ticker+",", "")
        const response = await axios.get(`https://alpha.financeapi.net/market/get-realtime-prices?symbols=${tickerString}`, options)
        const currentPrices = response.data.data
        let totalAssets = 0
        stockWithPrices.forEach((stock,index)=>{
            let shares = stock.quantity
            let currentPrice = currentPrices[index].attributes.last
            totalAssets += shares*currentPrice
            stock.price = currentPrice
        })
        let currentBalance = totalAssets + req.user.buyingPower
        res.send({table: stockWithPrices, totalAssets: totalAssets, currentBalance: currentBalance})
    }catch(err){
        res.send(err).status(400)

    }
})

router.get('/news',ensureAuth,async(req,res)=>{
    //check databse for news first
    const stock = req.query.stock

    const url = `https://api.marketaux.com/v1/news/all?symbols=${stock}&filter_entities=true&language=en&api_token=${process.env.NEWS_API_KEY}`
    try{
        const news = await axios.get(url)
        res.send(news.data)   
    }catch(err){
        console.log(err)
        res.send(err).status(400)
    }


})

router.get('/autocomplete', ensureAuth, async(req,res)=>{
    const query = req.query.query
    const suggestionAmount = 5
    const regex = new RegExp(`^${query}`,'i')
    try{
        const results = await Symbols.find({$or: [{"Symbol": regex }, 
        {"Name": regex}]})
        res.send(results.slice(0,suggestionAmount))
    }catch(err){
        console.log(err)
        res.send(err).status(400)
    }
})


module.exports = router