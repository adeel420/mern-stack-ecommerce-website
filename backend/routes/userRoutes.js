const express = require('express')
const router = express.Router()
const User = require('./../models/user')
const { jwtAuthMiddleware, generateToken } = require('./../controllers/jwt')
const { signupValidation, loginValidation } = require('./../validation/authValidation')

router.post('/signup', signupValidation, async (req, res) => {
    try {
        const data = req.body
        const newData = new User(data)
        const response = await newData.save()
        const token = generateToken(response.email)
        res.status(200).json({ response: response, token: token })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'internal server error' })
    }
})

router.post('/login', loginValidation, async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'invalid email and password' })
        }
        const payLoad = {
            id: user.id,
            email: user.email
        }
        const token = generateToken(payLoad)
        res.json({ token })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'internal server error' })
    }
})

const bcrypt = require('bcrypt')
router.put('/forget-password', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(200).json({ message: 'user not found' })
        }
        const harshedPassword = await bcrypt.hash(password, 10)
        const response = await User.findByIdAndUpdate(user.id, { password: harshedPassword })
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'internal server error' })
    }
})

router.get('/name', jwtAuthMiddleware, async (req, res) => {
    try {
        const userId = req.user.id
        const data = await User.findById(userId)
        res.status(200).json({ name: data.name, role: data.role, email: data.email, phone: data.phone, address: data.address })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'internal server error' })
    }
})

router.put('/update-address/:id', jwtAuthMiddleware, async (req, res) => {
    try {
        const id = req.params.id
        const userAddress = req.body
        const response = await User.findByIdAndUpdate(id, userAddress)
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'internal server error' })
    }
})
module.exports = router