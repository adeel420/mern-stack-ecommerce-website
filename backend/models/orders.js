const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    products: [
        {
            type: mongoose.ObjectId,
            ref: 'product'
        }
    ],
    payment: {},
    buyer: {
        type: mongoose.ObjectId,
        ref: 'user'
    },
    status: {
        type: String,
        default: 'not process',
        enum: ['not process', 'processing', 'shipped', 'cancel']
    }
}, { timestamps: true })

const Orders = mongoose.model('order', orderSchema)
module.exports = Orders