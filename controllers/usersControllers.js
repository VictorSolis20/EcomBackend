const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')

const registerUser = asyncHandler(async (req, res) => {

    //desestructuramos los datos que pasamos del body
    const { name, email, password, address, admin, state } = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('The name, email and password fields are required')
    }

    //verificamos si ese usuario existe
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('This user has already been registered')
    }

    //hash al password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //creamos el usuario
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        address,
        admin,
        state
    })

    //si se creó correctamente, muestra los datos, de lo contrario manda mensaje de error
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('Failed to register user')
    }

})

const loginUser = asyncHandler(async (req, res) => {
    //desestructuramos los datos del body
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error('Faltan datos')
    }

    //vamos a buscar a ese usuario
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            message: "Logged in user",
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Incorrect credentials')
    }
})

const getUserData = asyncHandler(async (req, res) => {
    res.json(req.user)
})

const updateUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { name, email, password, address, admin, state } = req.body;
    const userData = { name, email, password, address, admin, state };
    const userExists = await User.findOne({ id: req.body._id });

    if (req.user.admin) {
        if (!userExists) {
            res.status(400).json({ message: "User not found" });
        }

        if (!name && !email && !password && !address && !admin && !state) {
            res.status(400);
            throw new Error("Please provide information to update the user");
        }

        const updatedUser = await User.findByIdAndUpdate(id, userData, {
            new: true,
        });

        // Elimina la contraseña del objeto updatedUser antes de enviar la respuesta
        updatedUser.password = undefined;

        res
            .status(200)
            .json({ message: "User updated successfuly", updatedUser });
    } else {
        res
            .status(401)
            .json({ message: "You dant have the permissions to update" });
        throw new Error("Authorization denied");
    }
});

//funcion para generar el JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '60m'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getUserData,
    updateUser
}