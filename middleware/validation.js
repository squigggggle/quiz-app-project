import Joi from "joi";

const validatePostBasicUser = (req, res, next) => {
    const userSchema = Joi.object({
        firstName: Joi.string().min(2).max(50).pattern(/^[a-zA-Z]+$/).messages({
            "string.base":"First Name should be a string",
            "string.empty":"First Name cannot be empty",
            "string.min":"First Name should have a minimum length of {#limit}",
            "string.max":"First Name should have a maximum length of {#limit}",
            "string.pattern":"First Name should contain alpha characters only"
        }),
        lastName: Joi.string().min(2).max(50).pattern(/^[a-zA-Z]+$/).messages({
            "string.base":"Last Name should be a string",
            "string.empty":"Last Name cannot be empty",
            "string.min":"Last Name should have a minimum length of {#limit}",
            "string.max":"Last Name should have a maximum length of {#limit}",
            "string.pattern":"Last Name should contain alpha characters only"
        }),
        username: Joi.string().unique().min(5).max(10).alphanum().messages({
            "string.base":"Username should be a string",
            "string.empty":"Username cannot be empty",
            "string.unique":"Username should be unique",
            "string.min":"Username should have a minimum length of {#limit}",
            "string.max":"Username should have a maximum length of {#limit}",
            "string.alphanum":"Username should contain alphanumeric characters only"
        }),
        email: Joi.string().email().unique().messages({
            "string.base":"Email should be a string",
            "string.empty":"Email cannot be empty",
            "string.email":"Email should use valid syntax",
            "string.unique":"Email should be unique",
        })
    })
}