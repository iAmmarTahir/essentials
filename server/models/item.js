const mongoose = require('mongoose')

const Schema = mongoose.Schema

const item = new Schema({
    itemName: {type: String, required: true},
    description: {type: String,  max: 300, required: true},
    price: {type: Number, required: true},
    image: {type: String, required: true},
    quantity: {type: Number, required: true},
    location: {lat: {type: Number, required:true},lng: {type: Number, required: true}},
    timeMade: {type: Date, required: true},
    madeBy: {type:Schema.Types.ObjectId , ref: 'User', required: true}
})

const itemModel = mongoose.model('Item', item)

module.exports = itemModel