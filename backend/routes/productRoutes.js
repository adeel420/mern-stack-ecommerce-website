const express = require('express')
const Product = require('../models/product')
const router = express.Router()
const multer = require('multer')
const { func } = require('joi')
require('dotenv').config();
const { jwtAuthMiddleware, generateToken } = require('./../controllers/jwt')
const Category = require('../models/category')
const Orders = require('../models/orders')
const braintree = require("braintree");

var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: 'sxc9yj7s2795ddcp',
    publicKey: 'hzfrgwhpvpznksdm',
    privateKey: '755039e8d50b8a5fce3ad8cc50bc9524'
});

router.get('/client-token', async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(401).json(err)
            } else {
                res.status(200).json(response)
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'internal server error' })
    }
})

router.post('/client-payment', jwtAuthMiddleware, async (req, res) => {
    try {
        const { cart, nonce } = req.body
        let total = 0
        cart.map(i => {
            total += i.price
        })
        let newTransactions = gateway.transaction.sale(
            {
                amount: total,
                paymentMethodNonce: nonce,
                options: {
                    submitForSettlement: true
                }
            },
            function (err, result) {
                if (result) {
                    const products = new Orders({ products: cart, payment: result, buyer: req.user.id }).save()
                    res.status(200).json(products)
                } else {
                    res.json(err)
                }
            }
        )
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'internal server error' })
    }
})

router.get('/get-orders', jwtAuthMiddleware, async (req, res) => {
    try {
        const orders = await Orders.find({ buyer: req.user.id }).populate('products', ['image', 'name', 'description', 'price']).populate('buyer', 'name')
        res.status(200).json(orders)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'internal server error' })
    }
})

router.get('/admin-orders', jwtAuthMiddleware, async (req, res) => {
    try {
        const orders = await Orders.find({}).populate('products', ['image', 'name', 'description', 'price']).populate('buyer', 'name') //.sort({ createdAt: '-1' })
        res.status(200).json(orders)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'internal server error' })
    }
})

router.use(express.static('public'))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/Images')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage })
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const { name, description, price, quantity, category, shipping } = req.body;
        if (!category) {
            return res.status(400).json({ error: 'Category is required' });
        }
        console.log(category)
        const categoryId = category
        const categoryData = await Category.findById(categoryId);

        const newImage = new Product({ name, description, price, quantity, shipping, category: categoryData, image: req.file.filename })
        const result = await newImage.save();
        res.status(200).json(result);
    } catch (err) {
        console.error("Error details:", err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const response = await Product.find()
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'internal server error' })
    }
})

router.get('/single/:name', async (req, res) => {
    try {
        const productName = req.params.name
        const data = await Product.find({ name: productName })
        res.status(200).json({ data: data[0] })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'internal server error' })
    }
})

router.put('/update/:id', upload.single('file'), async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        if (req.file) {
            data.image = req.file.filename
        }
        const response = await Product.findByIdAndUpdate(id, data, { new: true })
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'internal server error' })
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id
        const data = await Product.findByIdAndDelete(id)
        res.status(200).json(data)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'internal server error' })
    }
})

router.post('/filter', async (req, res) => {
    try {
        const { categories, priceRange } = req.body
        const args = {}
        if (categories && categories.length > 0) {
            args.category = { $in: categories }
        }
        if (priceRange && priceRange.length === 2) {
            args.price = { $gte: priceRange[0], $lte: priceRange[1] }
        }
        const products = await Product.find(args)
        res.status(200).json(products)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'internal server error' })
    }
})

router.get('/related/:cid/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params
        const products = await Product.find({ category: cid, _id: { $ne: pid } }).limit(3).populate('category')
        res.status(200).json(products)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'internal server error' })
    }
})

router.get('/category-wise/:name', async (req, res) => {
    try {
        const name = req.params.name
        const category = await Category.findOne({ name: name })
        const products = await Product.find({ category }).populate('category')
        res.status(200).json({ category, products })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'internal server error' })
    }
})

router.put('/update-orders/:id', jwtAuthMiddleware, async (req, res) => {
    try {
        const id = req.params.id
        const { status } = req.body
        const orders = await Orders.findByIdAndUpdate(id, { status }, { new: true })
        res.status(200).json(orders)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'internal server error' })
    }
})

module.exports = router