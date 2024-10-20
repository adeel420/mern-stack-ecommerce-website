const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.ObjectId,
        ref: 'category',
    },
    shipping: {
        type: Number,
        default: 0
    }
})

const Product = mongoose.model('product', productSchema)
module.exports = Product