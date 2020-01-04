const mongoose = require('mongoose')
const Schema = mongoose.Schema

const review = new Schema({
    rating: {type: Number, required: true},
    description: {type: String, required: true},
    reviewBy: {type: Schema.Types.ObjectId, ref: 'User', required: true}
})

const reviewModel = mongoose.model('Review', review)

module.exports = reviewModel