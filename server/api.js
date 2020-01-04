// Main file to handle all the incoming calls to API

const express = require('express')
const router = express.Router()


const User = require('./routes/userRoute')
const Thing = require('./routes/thingRoute')
const Order = require('./routes/orderRoute')
const Review = require('./routes/reviewRoutes')

router.use('/order', Order)
router.use('/thing', Thing)
router.use('/user', User)
router.use('/review', Review)


module.exports = router