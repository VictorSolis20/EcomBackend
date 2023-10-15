const Joi = require("joi");

const schemaUsers = Joi.object().keys({
    name: Joi.string().min(3).max(30).required().messages({
        "string.base": `Name must be a string of characters`,
        "string.empty": `Name must not be empty`,
        "string.min": `Name must be a minimum of {#limit} characters`,
        "any.required": `The name field is required`
    }),
    email: Joi.string().email().required().messages({
        "string.email": "The email field must have a valid format",
        "string.empty": `The email must not be empty`,
        "any.required": `The email field is required`
    }),
    password: Joi.string().min(3).max(30).required().messages({
        "string.min": "The password field must have a minimum of {#limit} characters",
        "string.empty": `The password must not be empty`,
        "any.required": `The password field is required`
    }),
    admin: Joi.boolean(),
    state: Joi.boolean(),
    address: Joi.object(),
})

module.exports = {schemaUsers}