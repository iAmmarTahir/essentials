const express = require('express')
const router = express.Router()
const auth = require('../auth')
const Order = require('../models/order')

// Add order
router.post('/addOrder', auth , (req, res) => {
    const anOrder = new Order({
        buyer: req.body.buyer,
        thing: req.body.thing
    }).save((err, ans) => {
        if(err) res.sendStatus(401)
        res.status(200).send({msg : 'Order Added...', payload: ans})
    })
})


// Update status to completed when its done
router.put('/updateStatus', auth, (req,res) => {
    Order.findById(req.body._id,(err, ans) => {
        if(err) res.sendStatus(404)
        ans.status = 'Completed'
        ans.save((err, result) => {
            if(err) res.sendStatus(404)
            res.status(200).json({msg: 'Updated'})
        })
    })
})

module.exports = router