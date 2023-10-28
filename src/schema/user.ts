import Joi from 'joi';

export const createUser:any = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
})