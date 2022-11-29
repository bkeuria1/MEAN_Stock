const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const today = new Date();
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
  },
  displayName: {
    type: String,

  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,

  },
  email:{
    type:String,
    require: true
  },
  image: {
    type: String,
  },
  buyingPower:{
    type: Number,
    default: 1000000,
  },
  password:{

  },
  balance:{
    type: [{date: String, balance: Number}],
    default : [{date: date, balance: 1000000} ]
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('User', UserSchema)
