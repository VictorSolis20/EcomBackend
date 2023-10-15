const express = require('express')
const router = express.Router()
const { getOrder, createOrder, updateOrder, softDeleteOrder } = require('../controllers/ordersControllers')
const {protect} = require('../middlewares/authMiddlewares')

router.get('/', protect, getOrder)
router.post('/create', protect, createOrder)

router.patch('/update/:id', protect, updateOrder)
router.patch('/delete/:id', protect, softDeleteOrder)

module.exports = router