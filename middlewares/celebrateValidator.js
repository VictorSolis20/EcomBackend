const { celebrate, Segments } = require('celebrate');

const { schemaUsers } = require('../validators/usersValidators');
const { schemaProducts } = require('../validators/productsValidators');

const celebrateValidatorUsers = celebrate({
    [Segments.BODY]: schemaUsers
})

const celebrateValidatorProducts = celebrate({
    [Segments.BODY]: schemaProducts
})

module.exports = { celebrateValidatorUsers, celebrateValidatorProducts };