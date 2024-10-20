const express = require('express')
const app = express()
const db = require('./db')
require('dotenv').config()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const PORT = process.env.PORT || 8080
const cors = require('cors')
app.use(cors())

// files
const passport = require('./controllers/auth')
const userRoutes = require('./routes/userRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/productRoutes')

app.use(passport.initialize())
const authMiddleware = passport.authenticate('local', { session: false })

// routes
app.use('/user', userRoutes)
app.use('/category', categoryRoutes)
app.use('/product', productRoutes)

app.listen(PORT, () => {
    console.log(`listening the port ${PORT}`)
}) 