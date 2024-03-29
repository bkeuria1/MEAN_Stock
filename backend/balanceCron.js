require('dotenv').config()
const axios = require('axios')
const User = require('./models/user')
const Stock = require('./models/stock')
//const passport = require('passport');
const options = {
    headers: {
        'X-API-KEY': process.env.YF_API_KEY
    }
}

async function calculateBalance(){
    const mongoose = require('mongoose')
    mongoose.connect(process.env.DATABASE_URL, 
    { useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex:true
    
    })
    const db = mongoose.connection
    db.on('error', error => console.error(error))
    db.once('open', () => console.log('Connected to Mongoose'))

    console.log("Balance called")
    try{
        console.log("Balance called 2")
        const allUsers = await User.find({})
        console.log(allUsers.length)
    
        console.log(allUsers.length)
        for(const user of allUsers){
            console.log("The user is "+ user.email)
            let totalAssets = 0
            const buyingPower = user.buyingPower
            let userStocks = await Stock.find({user:user})
            let queryString = ''
            if(userStocks.length>0){
                userStocks.forEach(stock =>{
                    queryString += `${stock.ticker}%2c`
                })
                const res = await axios.get(`https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${queryString}`,options)
                for(const stock of res.data.quoteResponse.result){
                    let ticker = stock.symbol
                    let currentPrice = stock.ask
                    let stockDB = await Stock.findOne({ticker: ticker, user:user})
                    if(stockDB){
                        let stockAmount = (stockDB.total + (currentPrice*stockDB.quantity-stockDB.total))
                        //console.log(`Heres the current price for ${stock.id}: ${currentPrice} with quantity of ${stockDB.quantity} and amount ${stockAmount}`)
                        totalAssets += stockAmount
                        console.log(totalAssets)
                    }
                    
                
                }
            }
            let currentBalance = buyingPower + totalAssets
            console.log("Total Assets: " + totalAssets)
            console.log("Current Balance" + currentBalance)
            user.balance.push({date: getDate(), balance: currentBalance})
            await user.save()                                                                      
        }
        
    
    
    }catch(err){
        console.log(err)
    }
    console.log("hey")
    process.exit()

}

const getDate = ()=>{
    const today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    return date 


} 

calculateBalance()




