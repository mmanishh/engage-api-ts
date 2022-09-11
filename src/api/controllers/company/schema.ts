import Joi from "@hapi/joi";
export const create = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().allow(null, ''),
        phone: Joi.string().allow(null, ''),
        website: Joi.string().uri().allow(null, ''),
    }),
};
export const update = {
    params: Joi.object().keys({
        id: Joi.string().guid().required(),
    }),
    body: Joi.object().keys({
        name: Joi.string(),
        email: Joi.string(),
        phone: Joi.string(),
        website: Joi.string().uri(),
    }),
};
export const getById = {
    params: Joi.object().keys({
        id: Joi.string().guid().required(),
    }),
};
