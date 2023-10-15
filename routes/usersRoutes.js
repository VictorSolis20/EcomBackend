const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getUserData, updateUser } = require('../controllers/usersControllers')
const { protect } = require('../middlewares/authMiddlewares')
const { celebrateValidatorUsers } = require('../middlewares/celebrateValidator')

router.post('/', celebrateValidatorUsers, registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getUserData)
router.patch('/update/:id', protect, updateUser)

module.exports = router