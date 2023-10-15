const Joi = require("joi");

const schemaProducts = Joi.object().keys({
    name: Joi.string().min(3).max(40).required().messages({
        "string.base": `Name must be a string of characters`,
        "string.empty": `Name must not be empty`,
        "string.min": `Name must be a minimum of {#limit} characters`,
        "any.required": `The name field is required`
    }),
    description: Joi.string().min(5).max(100).required().messages({
        "string.base": `Description must be a string of characters`,
        "string.empty": `Description must not be empty`,
        "string.min": `Description must be a minimum of {#limit} characters`,
        "any.required": `The description field is required`
    }),
    price: Joi.number().required().messages({
        "number.base": `The price must be numbers`,
        "number.empty": `The price must not be empty`,
        "any.required": `The price field is required`
    }),
    quantity: Joi.number().required().messages({
        "number.base": `The quantity must be numbers`,
        "number.empty": `The quantity must not be empty`,
        "any.required": `The quantity field is required`
    }),
    img: Joi.string(),
    state: Joi.boolean(),
})

module.exports = {schemaProducts}