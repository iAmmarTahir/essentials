const mongoose = require('mongoose')
const Schema = mongoose.Schema

const thing = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: String, required: true},
    quantity: {type: Number, required: true},
    location: {
        lat: {type: Number, required: true},
        lng: {type: Number, required: true}
    },
    timeMade: {type: Date, required:true},
    madeBy: {type: Schema.Types.ObjectId, ref: 'User'},
    isSold: {type: Boolean, default: false}
})

const thingModel = mongoose.model('Thing', thing)

module.exports = thingModel