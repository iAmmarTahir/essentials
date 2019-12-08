const express = require('express')
const router = express.Router()
const Thing = require('../models/thing')
const User = require('../models/user')
const auth = require('../auth')

// Add a new item
router.post('/addThing', auth , (req, res) => {
    const aThing = new Thing({
        name: req.body.name,
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
        
        User.findById(req.body.userId, (err, user) => {
            if (err) console.log(err)
            if(!user) throw new Error('No user')
            user.things.push(ans._id)
            user.save()
        })
        res.status(200).send(ans)
    })
})

// Delete an item
router.delete('/deleteThing', auth,  (req,res) => {
    let notFound = false
    Thing.findById(req.body._id,(err, thing) => {
        if(err) console.log(err)
        if(!thing) {
            notFound = true
            return res.status(404).send('Not found')
        }
        if(!notFound) {
            User.findById(thing.madeBy, (err, user) => {
                if (err) console.log(err)
                for (let i = 0; i < user.things.length; i++) {
                    if (user.things[i] == req.body._id) {
                        user.things.splice(i, 1)
                        break;
                    }
                }
                user.save()
            })
        }
        
    }).then(
        () => {
            if (!notFound) {
                Thing.findOneAndDelete(req.body._id, (err) => {
                    if (err) res.status(404).json({
                        msg: 'Does not exists'
                    })
                    res.status(200).json({
                        msg: 'Deleted successfully...'
                    })
                })
            }
        }
    )

    
    
})

module.exports = router