const express = require('express');
const router = express.Router()
const { sendEmail } = require('../controllers/MailController');
require('dotenv').config()
const {ensureAuth} = require('../middleware/ensureAuth');

router.post('/sale', ensureAuth, sendEmail);
module.exports = router