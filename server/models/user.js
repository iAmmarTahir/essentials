const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
let SALT = 10
const Schema = mongoose.Schema

const User = new Schema({
    name: {type: String, required: true},
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isBuyer: {type: Boolean, default: false},
    phone: {type:String , required: true},
    dateRegistered: {type: Date,default: Date.now()},
    items: [{type: Schema.Types.ObjectId , ref: 'Item'}]
})

User.pre('save', function(next) {
    let user = this;
    if(user.isModified('password')) {
        bcrypt.genSalt(SALT, function(err, salt) {
            if(err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash;
                next();
            })
        })
    } else {
        next()
    }
})

User.methods.comparePassword = function(userPassword, checkPassword) {
    bcrypt.compare(userPassword, this.password, function(err, isMatch) {
        if(err) return checkPassword(err)
        checkPassword(null, isMatch)
    })
}

const userModel = mongoose.model('User', User)

module.exports = userModel