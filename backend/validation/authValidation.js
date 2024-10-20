const joi = require('joi')

const signupValidation = (req, res, next) => {
    try{
        const Schema = joi.object({
            name: joi.string().min(3).max(100).required(),
            email: joi.string().email().required(),
            password: joi.string().min(5).max(100).required(),
            phone: joi.string().min(11).max(100).required(),
            address: joi.string().min(3).max(100).required(),
        })
        const {error} = Schema.validate(req.body)
        if(error){
            return res.status(401).json({message: 'invalid fields', error})
        }
        next()
    }catch(err){
        console.log(err)
        res.status(500).json({error: 'internal server error'})
    }
}

const loginValidation = (req, res, next) => {
    try{
        const Schema = joi.object({
            email: joi.string().email().required(),
            password: joi.string().min(5).max(100).required(),
        })
        const {error} = Schema.validate(req.body)
        if(error){
            return res.status(401).json({message: 'invalid fields', error})
        }
        next()
    }catch(err){
        console.log(err)
        res.status(500).json({error: 'internal server error'})
    }
}

module.exports = {signupValidation, loginValidation}