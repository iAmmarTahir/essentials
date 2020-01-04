const express = require('express')
const router = express.Router()
const auth = require('../auth')
const Order = require('../models/order')
const Thing = require('../models/thing')
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

// Get order
router.get('/getOrders', auth, (req,res) => {
    Order.find({'buyer': req.query.userId}).populate('thing').exec((err, ans) => {
        res.status(200).send({ans})
    })
})

// Update status to completed when its done
router.put('/updateStatus', auth, (req,res) => {
    Order.findById(req.body._id,(err, ans) => {
        if(err) res.sendStatus(404)
        ans.status = 'Completed'
        Thing.findById(ans.thing, (err, result) => {
            if(err) throw err
            if(result) {
                result.isSold = true
            }
            result.save()
        }).then(
            () => {
                ans.save((err, result) => {
                    if (err) res.sendStatus(404)
                    res.status(200).json({
                        msg: 'Updated'
                    })
                })
            }
        )
        
    })
})

module.exports = router