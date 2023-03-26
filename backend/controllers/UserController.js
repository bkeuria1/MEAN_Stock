const User = require("../models/user");

module.exports = {
    current(req,res){
        console.log("Hey" + req.sessionID)
        try{
            res.status(200).send(req.user)
        }catch(err){
            return err;
        }
    },

    async allUser(req,res){
        let user = await User.find({})
        res.send(user)
    },

    async buyingPower(req,res){
        try{
            const buyingPower = await req.user.buyingPower
            res.send({"buyingPower":buyingPower})
        }catch(err){
            console.log(err)
        }
    },

    async reset(req,res){
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
    },

    async balance(req,res){
        try{
            const balance = req.user.balance
            let timeFrame = req.query.timeFrame
            switch(timeFrame){
                case('1D'):
                    timeFrame = -2
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
            }
            
            return res.send(balance.slice(timeFrame))
        }catch(err){
            return res.status(400).send()
        }
    },

    async deleteUser(req,res){
        const user = req.user
        try{
            await user.delete()
            return res.send()
        }catch(err){
            console.log(err)
        }
    },

    async ownsStock(req,res){
        try{
            const ticker = req.query.ticker
           
            const userStocks = await Stock.findOne({'user':req.user, 'ticker': ticker}, {"_id":0,"ticker":1})
            res.send(userStocks !== null).status(200)
        }catch(err){
            res.send(err).status(400)
        }
    } 



    
}