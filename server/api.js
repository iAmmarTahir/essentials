// Main file to handle all the incoming calls to API

const express = require('express')
const router = express.Router()
const User = require('./routes/userRoute')
const Item = require('./routes/itemRoute')

router.use('/item', Item)
router.use('/user', User)


module.exports = router