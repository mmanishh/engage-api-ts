import Joi from "@hapi/joi";
import pick from "../helpers/pick";
import { Request, Response, NextFunction } from 'express'
import { errorResponse } from "../helpers/helpers";

const validator = (schema:any) => (req: Request, res: Response, next: NextFunction) => {
    const validSchema = pick(schema, ['params', 'query', 'body']);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: 'key' } })
        .validate(object);
    if (error) {
        const errorMessage = error.details
            .map((details) => details.message)
            .join(', ');
        return errorResponse(req, res, errorMessage, 400);
    }
    Object.assign(req, value);
    return next();
};

export default validator;
