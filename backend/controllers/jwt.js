const jwt = require('jsonwebtoken')

const jwtAuthMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'unauthorized authHeader' })
    }
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader
    if (!token) {
        return res.status(401).json({ message: 'unauthorized token' })
    }
    try {
        const decoded = await jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch (err) {
        res.status(500).json({ message: 'unauthorized internal' })
    }
}

const generateToken = (userData) => {
    return jwt.sign(userData, process.env.SECRET_KEY)
}

module.exports = { jwtAuthMiddleware, generateToken }