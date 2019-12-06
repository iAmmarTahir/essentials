const express = require('express')
const router = express.Router()
const User = require('../models/user')


// Registering a new User
router.post('/signup', (req,res) => {
    
    const aUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone
    }).save((err, ans) => {
        if(err) {
            res.status(400).send(err)
        }
        res.status(200).send(ans)
    })
})

// Logging in a User
router.post('/login', (req, res) => {
    User.findOne({'email': req.body.email}, (err, user) => {
        if(!user){
            res.json({msg: 'User not found...'})
        }

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (err)  throw err
            if(!isMatch) return res.status(404).json({msg: 'Wrong password!'})
           return res.status(200).json({msg: 'Logged in'})
        })
    })
})


// Deleting a user
router.delete('/delete', (req, res) => { 
    let found = false
    User.findOne({
        'email': req.body.email
    }, (err, user) => {
        if (!user) {
            return res.status(404).json({
                msg: 'User not found...'
            })
        }

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (err) throw err
            if (!isMatch) return res.status(404).json({
                msg: 'Wrong password!'
            })
            found = true
        })
    }).then(
        () => {
             if(found){
                 User.deleteOne({
                     'email': req.body.email
                 }, (err, ans) => {
                     return res.status(200).json({
                         msg: 'Deleted...'
                     })
                 })
             }
             return
        }
    ).catch(
        (err) => console.log(err)
    )
   
})

module.exports = router