const express = require('express')
const router = express.Router()
const auth = require('../auth')

const Review = require('../models/review')
const Thing = require('../models/thing')

router.post('/addReview', auth, async (req, res) => {
    const aReview = new Review({
        rating: req.body.rating,
        description: req.body.description,
        reviewBy: req.body.reviewBy
    }).save(async (err,ans)=> {
        if(err) console.log(err)
        await Thing.findById(req.body.thing, (err, result) => {
            result.reviews.push(ans)
            result.save()
        })
        res.status(200).send({msg: 'Review Added...'})
    })
})

router.get('/productReview', auth, (req,res) => {
    Thing.findById(req.query.id).populate('reviews').exec((err,result) => {
        res.status(200).send({result})
    })
})

module.exports = router