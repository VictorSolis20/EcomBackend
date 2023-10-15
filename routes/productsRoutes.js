const express = require('express')
const router = express.Router()
const { getProducts, createProduct, updateProduct, softDeleteProduct } = require('../controllers/productsControllers')
const {protect} = require('../middlewares/authMiddlewares')

router.get('/', getProducts)
router.post('/create', protect, createProduct)

router.patch('/update/:id', protect, updateProduct)
router.patch('/delete/:id', protect, softDeleteProduct)

module.exports = router