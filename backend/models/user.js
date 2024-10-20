const { required } = require('joi')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

userSchema.pre('save', async function (next) {
    const user = this
    if(!user.isModified('password'))
        return next()
    try{
        const salt = await bcrypt.genSalt(10)
        const harshedPassword = await bcrypt.hash(user.password, salt)
        user.password = harshedPassword
        next()
    }catch(err){
        return next(err)
    }
})

userSchema.methods.comparePassword = async function (candidatePassword){
    try{
        const isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch
    }catch(err){
        throw err
    }
}

const User = mongoose.model('user', userSchema)
module.exports = User