const express = require('express');
const passport = require('passport');
const router = express.Router()
const Stock = require('../models/stock')
const User = require('../models/user')
require('../passport.js')

const {ensureAuth} = require('../middleware/ensureAuth');
const user = require('../models/user');
router.post('/buy', ensureAuth,async(req,res)=>{
  const user = req.user
  const buyingPower = req.user.buyingPower
  const total = req.body.total
  const quantity = req.body.quantity


  if(buyingPower<total || req.body.quantity>Number.MAX_SAFE_INTEGER){
    return res.status(400).send("Not enough buying power")

  }
  try{
    const ticker = new RegExp(req.body.ticker,'i')
    const currentStock = await Stock.findOne({user:req.user, ticker:ticker})
    if(currentStock){
      console.log(currentStock)
      currentStock.quantity += quantity
      currentStock.total += total
      currentStock.save()
    }else{
      const newStock = await Stock.create({
        ticker: ticker,
        total : total,
        quantity: quantity,
        user: user
      })
    }
    
    user.buyingPower -= total
    await user.save()
    res.status(200).send("Purchase is Completed")
  }catch(err){
    console.log(err)
    res.status(400).send("There was an error with your purchase")
  }
  
  
})

router.post('/sell', ensureAuth, async(req,res)=>{
  const user = req.user
  
  try{
    const ticker = new RegExp(req.body.ticker,'i')
    const currentStock = await Stock.findOne({user:req.user, ticker:ticker})
    if(req.body.quantity>currentStock.quantity){
      return res.status(400).send()
      
    }
    user.buyingPower += req.body.total
    user.save()
    if(currentStock.quantity === req.body.quantity){
      await Stock.deleteOne(currentStock)
      return res.send()
    
    }
    currentStock.quantity -= req.body.quantity
    currentStock.total -= req.body.total
    currentStock.save()
    res.send()
    
  }catch(err){
    console.log(err)
    res.status(400).send()

  }
})

module.exports = router