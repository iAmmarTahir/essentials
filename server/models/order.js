const mongoose = require('mongoose')

const Schema = mongoose.Schema

const order = new Schema({
    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    thing: {
        type: Schema.Types.ObjectId,
        ref: 'Thing',
        required: true
    },
    status: {
        type: String,
        default: 'In process'
    },
    orderTime: {
        type: Date,
        default: Date.now()
    }
})

const orderSchema = mongoose.model('Order', order)

module.exports = orderSchema