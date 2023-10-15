const express = require('express')
const router = express.Router()
const { getProducts, createProduct, updateProduct, softDeleteProduct } = require('../controllers/productsControllers')
const {protect} = require('../middlewares/authMiddlewares')
const { celebrateValidatorProducts } = require('../middlewares/celebrateValidator')

router.get('/', getProducts)
router.post('/create', protect, celebrateValidatorProducts, createProduct)

router.patch('/update/:id', protect, updateProduct)
router.patch('/delete/:id', protect, softDeleteProduct)

module.exports = router