const passport = require('passport');
const axios = require('axios')
const User = require('../models/user')
const Stock = require('../models/stock')
const Symbols = require('../models/symbol');
const options = {
    headers: {
        'X-API-KEY': process.env.YF_API_KEY
    } 
};
async function getCurrentPrice(ticker){
    const url = `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${ticker}`
    const apiResult = await axios.get(url,options)
    return apiResult.data.quoteResponse.result[0].ask
}
module.exports = {
    async chart(req,res){
        
        let {ticker, timeFrame} = req.query
        let url = `https://yfapi.net/v8/finance/chart/${ticker}?range=${timeFrame}&interval=1d`
    
        switch(timeFrame){
            case('1D'):
                timeFrame = "1d"
                url = `https://yfapi.net/v8/finance/chart/${ticker}?range=${timeFrame}`
                break
            case('5D'):
                timeFrame = "5d"
                break;
            case('1M'):
                timeFrame = "1mo"
                break;
            case('3M'):
                timeFrame = "3mo"
                break
            case('1Y'):
                timeFrame = "1y"
                break;
        }
      
        try{
            const results = await axios.get(url,options)
            let timestamp = results.data.chart.result[0].timestamp
            let close = results.data.chart.result[0].indicators.quote[0].close
            let combined = timestamp.map(function(date,index){
                return {
                    "date": new Date(date * 1000).toLocaleString("en-US"),
                    "price": close[index]
                }
            })
            res.send(combined)
        }catch(err){
            console.log(err)
            res.status(400).send()
        }
    },


    async realTimePrice(req,res){
        if(req.query.ticker === ''){
            return ""
        }
        let price = await getCurrentPrice(req.query.ticker)
        res.send({"price": price, "ticker": req.query.ticker}).status(200)
    
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
            const response = await axios.get(`https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${tickerString}`, options)
            const currentPrices = response.data.quoteResponse.result
            console.log(currentPrices)
            let totalAssets = 0
            stockWithPrices.forEach((stock,index)=>{
                let shares = stock.quantity
                let currentPrice = currentPrices[index].bid
                totalAssets += shares*currentPrice
                stock.price = currentPrice
            })
            let currentBalance = totalAssets + req.user.buyingPower
            res.send({table: stockWithPrices, totalAssets: totalAssets, currentBalance: currentBalance})
        }catch(err){
            console.log(err)
            res.send(err).status(400)

        }
    },
    
    
   
}