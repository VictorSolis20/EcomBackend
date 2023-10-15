const Order = require("../models/ordersModel");
const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res) => {
    if (!req.body) {
        req.status(400);
        throw new Error("Please provide a valid order");
    }

    const order = await Order.create({
        user: req.user.id,
        cart: req.body.cart,
    });
    res.status(201).json(order);
});

const getOrder = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user.id, state: true }).populate({ path: "user", select: "name address" }).populate({ path: "cart", select: "name price" });
    console.log(orders);
    res.status(200).json({ orders });
});

const updateOrder = asyncHandler(async (req, res) => {
    const id = req.params.id
    const order = req.body

    const orders = await Order.findById(req.params.id)
    if (!orders) {
        res.status(404)
        throw new Error('This order doesnt exists')
    }

    if (!order) {
        res.status(400)
        throw new Error("Please provide valid information to update")
    }

    //Verificar que la orden pertenezca al usuario logeado
    if (orders.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Acceso no autorizado')
    } else {
        const orderToUpdate = await Order.findByIdAndUpdate(id, order, { new: true })
        res.status(200).json({ message: "Order updated", orderToUpdate });
    }
})

const softDeleteOrder = asyncHandler(async (req, res) => {
    const id = req.params.id
    const isInactive = { state: false }
    const orderExists = await Order.findById(req.params.id)
    const orderAlreadyEliminated = await Order.findOne({ _id: id, state: false })
    if (!orderExists) {
        res.status(400)
        throw new Error("This order doesnt exists")
    }

    //Verificar que la orden pertenezca al usuario logeado
    if (orderExists.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Acceso no autorizado')
    } else {
        if (orderAlreadyEliminated) {
            res.status(400)
            throw new Error("This order is already eliminated")
        } else {
            const orderToUpdate = await Order.findByIdAndUpdate(id, isInactive)
            res.status(200).json({ message: "Order deleted", orderToUpdate })
        }
    }
});

module.exports = {
    getOrder,
    createOrder,
    updateOrder,
    softDeleteOrder
}