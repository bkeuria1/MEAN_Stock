const Stock = require('../models/stock')
module.exports = {
    async buy(req,res){
        const user = req.user
        const buyingPower = req.user.buyingPower
        const total = req.body.total
        const quantity = req.body.quantity
        const ticker = req.body.ticker.toUpperCase()
        if(buyingPower < total || quantity > Number.MAX_SAFE_INTEGER){
          return res.status(400).send("Not enough buying power")
        }
        try{
          const currentStock = await Stock.findOne({user:req.user, ticker: req.body.ticker})
          if(currentStock){
            currentStock.quantity += quantity
            currentStock.total += total
            currentStock.save()
          }else{
            await Stock.create({
              ticker: ticker,
              total : total,
              quantity: quantity,
              user: user
            })
          }
          
          user.buyingPower -= total
          await user.save()
          res.status(200).send()
        }catch(err){
          console.log(err)
          res.status(400).send("There was an error with your purchase")
        }
        
        
      },
      async sell(req,res){
        const user = req.user
        
        try{
         
          const currentStock = await Stock.findOne({user:req.user, ticker: req.body.ticker})
          if(!currentStock){
            res.status(400).send()
          }
          if(req.body.quantity > currentStock.quantity){
            return res.status(400).send("You dont own enough stock")
            
          }
          user.buyingPower += req.body.total
          user.save()
          if(currentStock.quantity === req.body.quantity){
            await Stock.deleteOne(currentStock)
            res.send()
          
          }
          currentStock.quantity -= req.body.quantity
          currentStock.total -= req.body.total
          currentStock.save()
          res.send()
          
        }catch(err){
          console.log(err)
          res.status(400).send()
      
        }
      }

}