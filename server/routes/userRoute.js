const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../config')
const secretKey = config.Secret

// Registering a new User
router.post('/signup', async (req,res) => {
    let exists = false
    User.findOne({'email':req.body.email}, (err, user) => {
        if(err) throw err
        if(user) {
            exists = true
            return res.status(401).json({msg: 'User already exists'})
        }
    })
    if(!exists){
        const aUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone
        })
        await aUser.save()
        const token = await aUser.getToken()
        res.status(200).json({token: token})
    }
})

// Logging in a User
router.post('/login',async (req, res) => {
    User.findOne({'email': req.body.email}, (err, user) => {
        if(!user){
            res.json({msg: 'User not found...'})
        }

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (err)  throw err
            if(!isMatch) return res.status(404).json({ errorMessage: 'Not found...' })
            user.getToken().then((token) =>{
                return res.status(200).json({
                    token: token
                })
            })
           
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


// Get User ID 
router.post('/getTokenData',async (req,res) => {
    let token = req.body.token
    if (token.startsWith('Bearer ')) {
        bearer = token.split(' ')
        token = bearer[1]
    }
    if (token) {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                })
            } else {
                res.status(200).json({ result: decoded })
            }
        })
    } else {
        res.json({
            success: false,
            message: 'Auth token is not supplied'
        })
    }
})

module.exports = router