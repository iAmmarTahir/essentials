const express = require('express')
const router = express.Router()
const Item = require('../models/item')

// Add a new item
router.post('/addItem', (req, res) => {
    const anItem = new Item({
        itemName: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: 'image/' + req.body.image,
        quantity: req.body.quantity,
        location: {lat: req.body.location.lat , lng: req.body.location.lng},
        timeMade: req.body.timeMade,
        madeBy: req.body.userId
    }).save((err, ans) => {
        if(err) {
            res.status(404).json({err})
        }
        res.status(200).send(ans)
    })
})

module.exports = router