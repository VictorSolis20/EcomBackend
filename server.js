const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errors} = require('celebrate');
const { errorHandler } = require('./middlewares/errorMiddlewares')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', require('./routes/usersRoutes'), errors())
app.use('/api/products', require('./routes/productsRoutes'), errors())
app.use('/api/orders', require('./routes/ordersRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))