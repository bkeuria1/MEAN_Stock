const express = require('express');
const router = express.Router()
const User = require('../models/user')
const Stock = require('../models/stock')
const axios = require('axios')

const {ensureAuth} = require('../middleware/ensureAuth');
const { current, buyingPower, reset, balance,deleteUser, ownsStock } = require('../controllers/UserController');


router.get('/current', current)

router.get('/buyingPower', ensureAuth, buyingPower)

router.get('/reset',ensureAuth, reset)

router.get('/balance',ensureAuth, balance)

router.delete('/delete',ensureAuth,deleteUser)

router.get('/ownsStock',ensureAuth,ownsStock)

module.exports = router