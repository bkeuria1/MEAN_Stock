const express = require('express');
const router = express.Router()

const {ensureAuth} = require('../middleware/ensureAuth');
const {buy,sell} = require('../controllers/SaleController')
router.post('/buy', ensureAuth,buy)

router.post('/sell', ensureAuth, sell)

module.exports = router