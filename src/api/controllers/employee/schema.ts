import Joi from "@hapi/joi";
export const create = {
    body: Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().allow(null, ''),
        phone: Joi.string().allow(null, ''),
        CompanyId: Joi.string().required(),
    }),
};
export const update = {
    params: Joi.object().keys({
        id: Joi.string().guid().required(),
    }),
    body: Joi.object().keys({
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string().email(),
        phone: Joi.string(),
    }),
};
export const getById = {
    params: Joi.object().keys({
        id: Joi.string().guid().required(),
    }),
};
