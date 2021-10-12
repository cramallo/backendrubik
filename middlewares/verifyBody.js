const Joi = require('@hapi/joi');

const signUpValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().max(50).required(),
        email: Joi.string().required().email(),
        dni: Joi.string().max(50).required(),
        state: Joi.string().max(50).required(),
        city: Joi.string().max(50).required(),
        address: Joi.string().max(50).required(),
        phone: Joi.string().max(50).required(),
        password: Joi.string().max(50).required()
    });

    try {
        schema.validate(req.body);
        next();
    } catch (error) {
        console.log(error);
        return res.status(400).send("bad request");
    }
}

const signUpProfessionalValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().max(50).required(),
        email: Joi.string().required().email(),
        dni: Joi.string().max(50).required(),
        state: Joi.string().max(50).required(),
        city: Joi.string().max(50).required(),
        address: Joi.string().max(50).required(),
        phone: Joi.string().max(50).required(),
        password: Joi.string().max(50).required(),
        monotax: Joi.string().max(100).required(),
    });

    try {
        schema.validate(req.body);
        next();
    } catch (error) {
        console.log(error);
        return res.status(400).send("bad request");
    }
}

const logInValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().max(50).required()
    });

    try{
        schema.validate(req.body);
        next();
    }
    catch (error) {
        return res.status(400).send(error.details[0].message);
    }
}

module.exports.signUpValidation = signUpValidation;
module.exports.signUpProfessionalValidation = signUpProfessionalValidation;
module.exports.logInValidation = logInValidation;
