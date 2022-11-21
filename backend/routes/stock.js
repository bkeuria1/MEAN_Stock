const express = require('express');
const axios = require('axios')
const router = express.Router()
const User = require('../models/user')
const Stock = require('../models/stock')
const Symbols = require('../models/symbol')
const {chart,userStockTable, realTimePrice, news, autoComplete} = require('../controllers/StockController')
const {ensureAuth} = require('../middleware/ensureAuth');
router.get('/chart', ensureAuth, chart)
router.get('/realtimePrice',ensureAuth, realTimePrice)
router.get('/userStocks', ensureAuth,userStockTable)
router.get('/news',ensureAuth,news)
router.get('/autocomplete', ensureAuth, autoComplete)


module.exports = router