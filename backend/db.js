const mongoose = require('mongoose')

const mongoUrl = "mongodb://localhost:27017/ecommerce"
mongoose.connect(mongoUrl)
const db = mongoose.connection
db.on('connected', () => {
    console.log('connected to mongodb')
})
db.on('disconnected', () => {
    console.log('disconnected to mongodb')
})
db.on('error', (err) => {
    console.log('error to connected to mongodb', err)
})
module.exports = db;
