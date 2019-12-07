// Main file to handle all the incoming calls to API

const express = require('express')
const router = express.Router()
const User = require('./routes/userRoute')
const Thing = require('./routes/thingRoute')

router.use('/thing', Thing)
router.use('/user', User)


module.exports = router