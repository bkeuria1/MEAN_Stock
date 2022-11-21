const passport = require('passport');
const axios = require('axios')
const User = require('../models/user')
const Stock = require('../models/stock')
const Symbols = require('../models/symbol')
const options = {
    headers: {
        'X-API-KEY': process.env.YF_API_KEY
    }
};
module.exports = {
    async chart(req,res){
        const url = `https://alpha.financeapi.net/symbol/get-chart?period=${req.query.timeFrame.toLowerCase()}&symbol=${req.query.stock}`
        try{
            const results = await axios.get(url,options)
            res.send(results.data.attributes)
        }catch(err){
            console.log(err)
            res.status(400).send()
        }
    },

    async realTimePrice(req,res){
        const url = `https://alpha.financeapi.net/market/get-realtime-prices?symbols=${req.query.stock}`
        try{
            const results = await axios.get(url,options) 
            res.send((results.data.data[0].attributes.last.toString()))
        }catch(err){
            console.log(err)
            res.status(400).send()
        }

    },

    async news(req,res){
        const stock = req.query.stock
        const url = `https://api.marketaux.com/v1/news/all?symbols=${stock}&filter_entities=true&language=en&api_token=${process.env.NEWS_API_KEY}`
        try{
            const news = await axios.get(url)
            res.send(news.data)   
        }catch(err){
            console.log(err)
            res.send(err).status(400)
        }
    },

    async autoComplete(req,res){
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
    },

    async userStockTable(req,res){
        try{
            const userStocks = await Stock.find({user: req.user},{_id:0, __v:0, date:0,user:0})
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
            console.log(stockWithPrices)
            res.send({table: stockWithPrices, totalAssets: totalAssets, currentBalance: currentBalance})
        }catch(err){
            console.log(err)
            res.send(err).status(400)

        }
    },
    
   
}